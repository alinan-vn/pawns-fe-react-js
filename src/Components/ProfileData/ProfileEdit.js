import React from 'react'
import { connect } from 'react-redux'
import { Form, Button, Grid } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'


class ProfileEditForm extends React.Component {
    constructor(){
        super()
        this.state = {
            elo: '',
            bio: '',
            profile_pic: '',
            profile_background: ''
        }
    }

    editProfile = () => {
        const profileData = {
            elo: this.state.elo,
            bio: this.state.bio,
            profile_pic: this.state.profile_pic,
            profile_background: this.state.profile_background
        }

        // redirect to profile

        const profileObj = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(profileData)
        }     

        fetch(`http://localhost:3000/users/${this.props.user.id}`, profileObj)
        .then(r => r.json())
        .then(user => this.props.history.push('/profile'))

    }

    handleInputChange = event => {
        this.setState({
            ...this.state,
            [event.target.title]: event.target.value
        })
    }

    setProfileState = () => {
        this.setState({
            elo: this.props.user.elo,
            bio: this.props.user.bio,
            profile_pic: this.props.user.profile_pic,
            profile_background: this.props.user.profile_background
        })
    }

    componentDidMount(){
        this.setProfileState()
    }
    
    render(){
        return(
            <Grid>
                <Grid.Column width={3} />
                <Grid.Column width={10}>
                    <Form>
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
                        <Button type='submit' onClick={this.editProfile}>Save!</Button>
                    </Form>
                </Grid.Column>
            </Grid>
            
        )
    }
}

const mapStateToProps = state => {
    return{
        user: state.authReducer.user
    }
}

export default withRouter(connect(mapStateToProps)(ProfileEditForm))