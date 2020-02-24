import React from 'react'
import { Grid, Form, Input, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import {loginUser} from '../Actions/auth'

class Login extends React.Component{
    constructor(props){
        super(props)
        this.state = {
          username: '',
          password_digest: '',
        }
      }
    
    handleInputChange = (e) => {
        // console.log(this.state)
        this.setState({
          [e.target.name]: e.target.value
        })
      }
    
    handleSubmit = (e) => {
        e.preventDefault()
    
        this.setState({
          username: '',
          password: '',
        })

        const reqObj = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        }
    
        fetch('http://localhost:3000/auth', reqObj)
        .then(resp => resp.json())
        .then(user => {
            console.log('correct user?', user)
            if (!user.error){
                this.props.loginUser(user)
                this.props.history.push('/')
            } else {
                alert(user.error)
            }
        })
    }


    render(){
        return(
            <Grid>
                <Grid.Column width={4} />

                <Grid.Column width={8}>
                    <Form>
                        <Form.Field>
                            {/* <Input label='username' placeholder='username' /> */}
                            <label style={{color: 'green'}}>Username</label>
                            <input 
                                name='username' 
                                placeholder='username' onChange={this.handleInputChange} />
                        </Form.Field>
                        <Form.Field>
                            <label>Password</label>
                            <input name='password_digest' placeholder='password' onChange={this.handleInputChange} type='password' />
                        </Form.Field>
                        <Button type='submit' onClick={false ? null : this.handleSubmit}>Sign In!</Button>
                    </Form>
                </Grid.Column>

                <Grid.Column width={4} />
                
            </Grid>
            
            
        )
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {
        loginUser: user => dispatch(loginUser(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)