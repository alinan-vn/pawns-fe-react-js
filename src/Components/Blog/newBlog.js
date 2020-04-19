import React from 'react'
import { Grid, Form, Button, TextArea } from 'semantic-ui-react'
import { tokenValidation } from '../../Actions/userValidation'
import { connect } from 'react-redux'
import { loginUser } from '../../Actions/auth'
import '../../App.css'

class newBlog extends React.Component {
    constructor(){
        super()
        this.state = {
            title: '',
            date: '',
            content: '',
            author: ''
        }
    }

    handleInputChange = e => {
        this.setState({
            ...this.state,
            [e.target.title]: e.target.value
        })
    }

    postBlog = () => {
        alert('you don bin bloged')
        this.setState({
            ...this.state,
            author: this.props.user.username
        })

        const blogData = {
            ...this.state,
            author: this.props.user.username
        }

        console.log('blog', blogData)

        const blogObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(blogData)
        }

        fetch(`http://localhost:3000/post_blog`, blogObj)
        .then(r => r.json())
        .then(blog => {
            this.props.history.push(`/blogs/`)
        })


    }

    componentDidMount(){
        tokenValidation(this.props)
    }

    render(){
        return(
            <Grid>
                <Grid.Column width={4} />

                <Grid.Column width={8}
                    className='divBackgroundCardWShadow'
                >
                    <h1>New Blog!</h1>
                    <Form className='mainFont'>
                        <Form.Field>
                            <label>Title</label>
                            <input
                                title='title'
                                placeholder="blog's title here"
                                value={this.state.title}
                                onChange={this.handleInputChange}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Date (mm-dd-yyyy)</label>
                            <input 
                                title='date'
                                placeholder='mm-dd-yyyy'
                                value={this.state.date}
                                onChange={this.handleInputChange}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Form.TextArea
                                title='content'
                                label='content'
                                placeholder='blog stuff here'
                                value={this.state.content}
                                onChange={this.handleInputChange}
                            />
                        </Form.Field>
                        <Form.Button onClick={this.postBlog}>Blog!</Form.Button>
                    </Form>
                </Grid.Column>
            </Grid>
        )
    }



}

const mapDispatchStateToProps = dispatch => {
    return {
        loginUser: user => dispatch(loginUser(user))
    }
}

const mapStateToProps = state => {
    return {
        user: state.authReducer.user
    }
}

export default connect(mapStateToProps, mapDispatchStateToProps)(newBlog)