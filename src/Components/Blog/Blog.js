import React from 'react'
import { connect } from 'react-redux'
import { Grid, Form, Button } from 'semantic-ui-react'
import { tokenValidation } from '../../Actions/userValidation'
import { loginUser } from '../../Actions/auth'
import { saveBlogs } from '../../Actions/blogs'
import '../../App.css'

class Blog extends React.Component {
    constructor(){
        super()
        this.state = {
            status: false,
            blog: []
        }
    }

    setBlogs = () => {
        const blogId = this.props.match.params.id

        fetch(`http://localhost:3000/blogs/${blogId}`)
        .then(r => r.json())
        .then(blog => {
            // this.props.saveBlogs(blogs)
            this.setState({
                status: true,
                blog: blog
            })
        })
    }

    showProfile = () => {
        const userData = {
            username: this.state.blog.author
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

    getBlog = () => {
        
        console.log('show blog', this.state.blog)

        return(
            <div>
                <h1>{ this.state.blog.title }</h1>
                <p 
                    onClick={ () => this.showProfile() }
                    className='cursorPoint'
                >
                    <strong>written by { this.state.blog.author } on { this.state.blog.date }
                    </strong>
                </p>
                <p>{ this.state.blog.content }</p>
            </div>
        )

    }


    componentDidMount(){
        this.setBlogs()
    }
    
    render(){
        return(
            <Grid style={{opacity: '.9'}}>
                <Grid.Column width={4} />

                <Grid.Column width={9} 
                    className='mainFont' 
                    style={{background: '#4592af'}}
                >
                    { this.state.status ? this.getBlog() : <p>loading</p>}
                </Grid.Column>
            </Grid>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.authReducer.user,
        blogs: state.blogReducer.blogs
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loginUser: user => dispatch(loginUser(user)),
        saveBlogs: blogs => dispatch(saveBlogs(blogs))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog)