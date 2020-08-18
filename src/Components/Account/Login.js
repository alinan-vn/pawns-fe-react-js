import React from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../../Actions/auth'
import { withRouter } from 'react-router-dom'
import '../../App.css'

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
    
        fetch('https://enigmatic-gorge-45286.herokuapp.com/auth', reqObj)
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

    render(){
        return(
            <section className='login'>
                <div className='login__form'>
                    <div className='login__text'>
                        <p>Username</p>
                        <input
                            className='login__text-input'
                            name='username'
                            placeholder='username'
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div className='login__text'>
                        <p>Password</p>
                        <input 
                            className='login__text-input'
                            name='password_digest'
                            type='password'
                            placeholder='password'
                            onChange={this.handleInputChange}
                        />
                    </div>

                    <button 
                        className='login__button'
                        type='submit'
                        onClick={this.handleSubmit}
                    >
                        Sign In!
                    </button>

                    <a className='login__create-account' href='/create-account'>Create an Account!</a>
                </div>
            </section>
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