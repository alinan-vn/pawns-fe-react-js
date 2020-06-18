import React from 'react'
import { Form, Button, Grid } from 'semantic-ui-react'
import { loginUser } from '../../Actions/auth'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import '../../App.css'

class CreateAccount extends React.Component {
    constructor(){
        super()
        this.state = {
            username: '',
            password: '',
            password_confirmation: '',
            elo: '',
            bio: '',
            profile_pic: '',
            profile_background: ''
        }
    }

    handleInputChange = event => {
        this.setState({
            ...this.state,
            [event.target.title]: event.target.value
        })
    }

    checkCorrectPassword = () => {
        if (this.state.password === this.state.password_confirmation){
            return true
        } else{
            return false
        }
    }

    authenticateUser = () => {
        const userData = {
            username: this.state.username,
            password: this.state.password
        }

        const userObj = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        }

        fetch('http://localhost:3000/auth', userObj)
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

    createUser = () => {
        if (this.checkCorrectPassword()){
            const userData = {
                username: this.state.username,
                password: this.state.password,
                elo: this.state.elo,
                bio: this.state.bio,
                profile_pic: this.state.profile_pic,
                profile_background: this.state.profile_background
            }

            const userObj = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(userData)
            }

            fetch('http://localhost:3000/users', userObj)
            .then(resp => resp.json())
            .then(user => {
                localStorage.setItem('token', user.token)
                this.props.history.push('/')
            })
        }
    }


    render(){
        const createAccountContainer = {
            background: '#44d9e6', 
            borderRadius: '10px', 
            marginTop: '30px',
            boxShadow: '5px 10px #3dc4d0'
        }

        return(
            <Grid>
                <Grid.Column width={3} />

                <Grid.Column width={10} style={createAccountContainer}>
                    <Form className='mainFont'>
                        <Form.Field>
                            <label>Username</label>
                            <input 
                                title='username'
                                placeholder='username'
                                value={this.state.username}
                                onChange={this.handleInputChange}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Password</label>
                            <input 
                                title='password'
                                placeholder='password'
                                type='password'
                                value={this.state.password}
                                onChange={this.handleInputChange}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Password Confirmation</label>
                            <input 
                                title='password_confirmation'
                                placeholder='password confirmation'
                                type='password'
                                value={this.state.password_confirmation}
                                onChange={this.handleInputChange}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Elo</label>
                            <input 
                                title='elo'
                                placeholder='elo' 
                                value={this.state.elo} 
                                onChange={this.handleInputChange} 
                            />
                        </Form.Field>
                        <Form.Field>
                            <Form.TextArea 
                                title='bio'
                                label='Bio' 
                                placeholder='bio...' 
                                value={this.state.bio} 
                                onChange={this.handleInputChange}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Profile Picture Link</label>
                            <input 
                                title='profile_pic'
                                placeholder='www.thebestprofilepic.com' 
                                value={this.state.profile_pic} 
                                onChange={this.handleInputChange}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Profile Background Link</label>
                            <input 
                                title='profile_background'
                                placeholder='www.thebestbackgroundpic.com' 
                                value={this.state.profile_background} 
                                onChange={this.handleInputChange}
                            />
                        </Form.Field>
                        <Button 
                            type='submit' 
                            onClick={this.createUser}
                            className='mainFont'
                            style={{
                                backgroundColor: '#ecfffb'
                            }}
                        >
                            Save!
                        </Button>
                    </Form>
                </Grid.Column>

            </Grid>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loginUser: user => dispatch(loginUser(user))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateAccount))