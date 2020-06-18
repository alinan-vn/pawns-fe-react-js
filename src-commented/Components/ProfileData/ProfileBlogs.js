import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Feed, Icon } from 'semantic-ui-react'
import '../../App.css'

class ProfileBlogs extends React.Component {
    constructor(){
        super()
        this.state = {
            blogs: []
        }
    }

    filterBlogs = (blogArray, username) => {
        let revBlogs = blogArray.reverse()
        if(this.props.user){
            let filteredBlogs = revBlogs.filter(blog => blog.author === username)
            console.log('filtering', filteredBlogs)
            this.setState({
                ...this.state,
                blogs: filteredBlogs
            })
        }
    }

    setBlogs = (username) => {
        fetch('http://localhost:3000/blogs/')
        .then(r => r.json())
        .then(blogs => {
            this.filterBlogs(blogs, username)
        })
    }

    showBlog = (blogId) => {
        this.props.history.push(`/blog/${blogId}`)
    }

    blogFeed = () => {
        if(this.state.blogs.length === 0){
            return(
                <em style={{textAlign: 'center'}}><p>this user has not written any blogs</p></em>
            )
        } else{
            return this.state.blogs.map((blog, ind) => {
                const colors = ['#ebd6b7', '#86a6df']
                const num = ind % 2
                return(
                    <Feed.Event 
                        icon='chess rook'
                        key={ind}
                        style={{background: colors[num]}}
                    >
                        <Feed.Content>
                            <Feed.Summary>
                                <p 
                                    className='contentIndent cursorPoint'
                                    onClick={() => this.showBlog(blog.id)}
                                >
                                    {blog.title}                        
                                </p>
                            </Feed.Summary>
                        </Feed.Content>
                        <hr />
                    </Feed.Event>
                )
            })
        }
    }

    getUser = () => {
        let token = localStorage.getItem('token')
        if(!token){
            this.props.history.push('/login')
        } else {
            const tokenObj = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
            fetch('http://localhost:3000/current_user', tokenObj)
            .then(r => r.json())
            .then(user => {
                this.setBlogs(user.username)
            })
        }
    }

    componentDidMount(){
        // this.setBlogs()
        this.getUser()
    }

    render(){
        return(
            <div style={{background: '#86a6df'}}>
                <h1
                    className='titlePadding mainFont'
                    style={{textAlign: 'center'}}
                >
                    Blogs!
                </h1>
                <br />
                <Feed
                    className='scrollContainer'
                    style={{maxHeight: '200px'}}
                >
                    { this.blogFeed() }
                </Feed>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.authReducer.user
    }
}

export default withRouter(connect(mapStateToProps)(ProfileBlogs))