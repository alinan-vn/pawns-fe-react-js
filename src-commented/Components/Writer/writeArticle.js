import React from 'react'
import { Grid, Form, Button, TextArea } from 'semantic-ui-react'
import { tokenValidation } from '../../Actions/userValidation'
import { connect } from 'react-redux'
import { loginUser } from '../../Actions/auth'
import '../../App.css'

class writeArticle extends React.Component {
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

    postArticle = () => {
        this.setState({
            ...this.state,
            author: this.props.user.username
        })

        console.log(this.state)

        const articleObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(this.state)
        }

        fetch(`http://localhost:3000/post_article`, articleObj)
        .then(r => r.json())
        .then(article => {
            this.props.history.push(`/articles/${article.id}`)
        })


    }

    componentDidMount(){
        tokenValidation(this.props)
    }

    render(){
        return(
            <Grid>
                <Grid.Column width={4} />

                <Grid.Column width={8} className='divBackgroundCardWShadow'>
                    <Form className='mainFont'>
                        <Form.Field>
                            <label>Title</label>
                            <input
                                title='title'
                                placeholder='title goes here'
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
                                label='Content'
                                placeholder='content goes here'
                                value={this.state.content}
                                onChange={this.handleInputChange}
                            />
                        </Form.Field>
                        
                        <Form.Button onClick={this.postArticle}>Submit</Form.Button>
                    </Form>
                </Grid.Column>
            </Grid>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loginUser: user => dispatch(loginUser(user))
    }
}

const mapStateToProps = state => {
    return {
        user: state.authReducer.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(writeArticle)