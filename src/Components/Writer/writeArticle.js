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
            content: ''
        }
    }

    handleInputChange = e => {
        this.setState({
            ...this.state,
            [e.target.title]: e.target.value
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
                        
                        <Form.Button>Submit</Form.Button>
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

export default connect(null, mapDispatchToProps)(writeArticle)