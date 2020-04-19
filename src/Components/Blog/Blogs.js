import React from 'react'
import { Grid, Feed, Button, Loader} from 'semantic-ui-react'
import { tokenValidation } from '../../Actions/userValidation'
import { saveBlogs } from '../../Actions/blogs'
import { connect } from 'react-redux'
import { loginUser } from '../../Actions/auth'
import '../../App.css'

class Blogs extends React.Component {
    
    renderBlogs = () => {
        if (this.props.blogs.length === 0){
            return(
                <div>Loading</div>
            )
        } else {
            return(
                this.props.blogs.map(blog => {
                    return (
                        <Feed.Event key={blog.id}>
                            <Feed.Content>
                                <Feed.Summary>
                                    <h1>{blog.title}</h1>
                                    <h3>
                                        written by {blog.author} on {blog.date}
                                    </h3>
                                    <p>
                                        {blog.content}
                                    </p>
                                </Feed.Summary>
                            </Feed.Content>
                        </Feed.Event>
                    )
                })
            )
        }
        
    }

    fetchBlogs = () => {
        fetch('http://localhost:3000/blogs/')
        .then(r => r.json())
        .then(blogs => this.props.saveBlogs(blogs))
    }
    
    componentDidMount(){
        tokenValidation(this.props)
        this.fetchBlogs()
    }

    render(){
        return(
            <Grid>
                <Grid.Column width={4} />

                <Grid.Column width={8} className='divBackgroundCardWShadow'>
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