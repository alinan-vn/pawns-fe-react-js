import React from 'react'
import { Grid, Form, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { loginUser } from '../../Actions/auth'
import { withRouter } from 'react-router-dom'
import CreateAccount from './CreateAccount'

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
            // console.log('correct user?', user)
            if (!user.error){
                localStorage.setItem('token', user.token)
                this.props.loginUser({id: user.id, username: user.username})
                this.props.history.push('/')
            } else {
                alert(user.error)
            }
        })
    }

    showCreateAccount = () => {
        this.props.history.push('/create-account')
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
                        <Button type='submit' onClick={this.handleSubmit}>Sign In!</Button>
                        <Button type='submit' onClick={this.showCreateAccount}>Create an Account!</Button>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))