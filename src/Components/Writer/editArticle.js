import React from 'react'
import { Grid, Form, Button, TextArea } from 'semantic-ui-react'
import { tokenValidation } from '../../Actions/userValidation'
import { loginUser } from '../../Actions/auth'
import { connect } from 'react-redux'
import '../../App.css'

class editArticle extends React.Component{
    constructor(){
        super()
        this.state = {
            title: '',
            date: '',
            content: ''
        }
    }

    handleInputChange = e => {
        this.setState({
            ...this.state,
            [e.target.title]: e.target.value
        })
    }

    getEditForm = () => {
        fetch(`https://enigmatic-gorge-45286.herokuapp.com/articles/${this.props.match.params.id}`)
        .then(r => r.json())
        .then(article => {
            this.setState({
                ...this.state,
                title: article.title,
                date: article.date,
                content: article.content
            })
        })
    }

    postEditForm = () => {
        const articleData = {
            title: this.state.title,
            date: this.state.date,
            content: this.state.content,
            // author: this.props.user.username
        }

        const articleObj = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(articleData)
        }

        fetch(`https://enigmatic-gorge-45286.herokuapp.com/articles/${this.props.match.params.id}`, articleObj)
        .then(r => r.json())
        .then(article => {
            // console.log('edit?', article)
            this.props.history.push(`/articles/${this.props.match.params.id}`)
        })
    }

    componentWillMount(){
        this.getEditForm()
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
                        
                        <Form.Button onClick={this.postEditForm}>Edit</Form.Button>
                    </Form>
                </Grid.Column>
            </Grid>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.authReducer.user
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(editArticle)