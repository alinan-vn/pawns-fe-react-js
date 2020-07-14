import React from 'react'
import { Grid, Feed, Button, Loader} from 'semantic-ui-react'
import { tokenValidation } from '../../Actions/userValidation'
import { saveBlogs } from '../../Actions/blogs'
import { connect } from 'react-redux'
import { loginUser } from '../../Actions/auth'
import '../../App.css'

class Blogs extends React.Component {
    constructor(){
        super()
        this.state = {
            revBlogs: []
        }
    }

    reverseBlogs = (blogArray) => {
        const revB = blogArray.reverse()

        this.setState({
            ...this.state,
            revBlogs: revB
        })
    }

    editBlog = (author, blogId) => {
        if(this.props.user.username === author){
            return(
                <Button
                    compact={true}
                    onClick={() => {this.props.history.push(`/edit-blog/${blogId}`)}}
                    style={{backgroundColor: '#78b0a0'}}
                >
                    Edit
                </Button>
            )
        }
    }

    deleteBlog = (author, blogId) => {
        if(this.props.user.username === author){
            return(
                <Button
                    compact={true}
                    onClick={() => this.handleDelete(blogId)}
                    style={{backgroundColor: '#709078'}}
                >
                    Delete
                </Button>
            )
        }
    }

    handleDelete = blogId => {
        const blogObj = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({id: blogId})
        }

        fetch(`https://enigmatic-gorge-45286.herokuapp.com/blogs/${blogId}`, blogObj)
        .then( r=> r.json())
        .then(json => this.fetchBlogs())
    }
    
    showBlog = (blogId) => {
        this.props.history.push(`/blog/${blogId}`)
    }

    contentReducer = (string) => {
        let stringArray = string.split(' ')
        stringArray = stringArray.splice(0, 40)
        let content = stringArray.join(' ')
        content += ' . . .'
        return content
    }

    showProfile = (author) => {
        const userData = {
            username: author
        }

        const userObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'application/json'
            },
            body: JSON.stringify(userData)
        }

        fetch(`http://localhost:3000/find_user_by_name`, userObj)
        .then(r => r.json())
        .then(user => {
            if (user.error){
                return alert(user.error)
            } else {
                this.props.history.push(`/users/${user.id}`)
            }
        })
    }

    renderBlogs = () => {
        const colors = ['#ebd6b7', '#b3b3b3']

        if (this.props.blogs.length === 0){
            return(
                <div>Loading</div>
            )
        } else {
            return(
                this.state.revBlogs.map((blog, ind )=> {
                    const num = ind % 2
                    return (
                        <Feed.Event 
                            key={ind}
                        >
                            <Feed.Content>
                                <Feed.Summary   
                                    style={{background: colors[num]}}
                                >
                                    <h1 className='mainFont cursorPoint' onClick={() => this.showBlog(blog.id)}>
                                        {blog.title}</h1>
                                    { this.editBlog(blog.author, blog.id) }
                                    { this.deleteBlog(blog.author, blog.id)}
                                    <p 
                                        className='mainFont cursorPoint'
                                        onClick={() => this.showProfile(blog.author)}
                                    >
                                        <strong>
                                        written by {blog.author}
                                        </strong>  
                                    </p>
                                    <p className='mainFont'>
                                        { this.contentReducer(blog.content) }
                                    </p>
                                </Feed.Summary>
                                <hr />
                            </Feed.Content>
                        </Feed.Event>
                    )
                })
            )
        }
        
    }

    fetchBlogs = () => {
        fetch('https://enigmatic-gorge-45286.herokuapp.com/blogs/')
        .then(r => r.json())
        .then(blogs => {
            this.props.saveBlogs(blogs)
            this.reverseBlogs(blogs)
        })
    }
    
    componentDidMount(){
        tokenValidation(this.props)
        this.fetchBlogs()
    }

    render(){
        const backgroundCard = {
            background: 'white',
            borderRadius: '10px',
            marginTop: '50px',
            boxShadow: '5px 10px black',
            opacity: '0.8'
        }
        return(
            <Grid>
                <Grid.Column width={4} />

                <Grid.Column width={8}
                    className='scrollContainer'
                    style={backgroundCard}
                >
                    { this.renderBlogs() }
                </Grid.Column>
            </Grid>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loginUser: user => dispatch(loginUser(user)),
        saveBlogs: blogs => dispatch(saveBlogs(blogs))
    }
}

const mapStateToProps = state => {
    return {
        user: state.authReducer.user,
        blogs: state.blogReducer.blogs
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Blogs)