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

        fetch(`https://enigmatic-gorge-45286.herokuapp.com/${blogId}`)
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

        fetch(`https://enigmatic-gorge-45286.herokuapp.com/find_user_by_name`, userObj)
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
        console.log(this.state.blog)

        const date = this.translateDate(this.state.blog.created_at)
        const upDate = this.translateDate(this.state.blog.updated_at)

        let text = ''

        if (date === upDate){
            text = `${date}`
        } else {
            text = `${date}, updated on ${upDate}`
        }

        return(
            <div>
                <h1>{ this.state.blog.title }</h1>
                <p 
                    onClick={ () => this.showProfile() }
                    className='cursorPoint'
                >
                    <strong>
                        written by { this.state.blog.author } on { text }
                    </strong>
                </p>
                <p>{ this.state.blog.content }</p>
            </div>
        )

    }

    translateDate = dateText => {
        let text = dateText.slice(0, 10)
        text = text.split('-')
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        let monthNum = parseInt(text[1]) - 1
        const month = months[monthNum]
        const day = parseInt(text[2])

        let date = `${month} ${day}, ${text[0]}`

        return date
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