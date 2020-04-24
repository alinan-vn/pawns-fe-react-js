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

    getBlog = () => {
        
        console.log('show blog', this.state.blog)

        return(
            <div>
                <h1>{ this.state.blog.title }</h1>
                <p><strong>written by { this.state.blog.author } on { this.state.blog.date }</strong></p>
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