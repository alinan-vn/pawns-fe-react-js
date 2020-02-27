import React from 'react'
import { connect } from 'react-redux'
import { Grid, Container, Divider, Image } from 'semantic-ui-react'
import { loginUser } from '../Actions/auth'
import { tokenValidation } from '../Actions/userValidation'
import ProfileEditForm from './ProfileEdit'

class Profile extends React.Component {
    constructor(){
        super()
        this.state = {
            profile_background: 'https://i.imgur.com/ca5GXkg.jpg',
            profile_pic: 'https://d2h1pu99sxkfvn.cloudfront.net/b0/14427198/520907985_m6TUWpNOFG/U5.jpg',
            editting: false
        }
    }

    setProfilePic = () => {
        if (this.props.user){
            this.setState({
                ...this.state,
                profile_pic: this.props.user.profile_pic
            })
        }
        
    }

    setProfileBackground = () => {
        if (this.props.user){
            this.setState({
                ...this.state,
                profile_background: this.props.user.profile_background
            })
        }
    }

    handleEditStatus = () => {
        this.setState({
            ...this.state,
            editting: true
        })
    }

    setEditFalse = () => {
        this.setState({
            ...this.state,
            editting: false
        })
    }


    componentDidMount(){
        tokenValidation(this.props)
        this.setProfileBackground()
        this.setProfilePic()
        // this.setEditFalse()
    }

    render(){

        const profileBackgroungImg = {
            height: '100px',
            width: '100%',
            backgroundImage: `url(${this.state.profile_background})`,
            borderRadius: '10px'
        }

        const profilePicture = {
            paddingTop: '20px',
            paddingBottom: '10px',
            paddingLeft: '10px',
            paddingRight: '10px',
            borderRadius: '45px'
        }

        const profileBackgrounDiv = () => {
            return (
                <div style={profileBackgroungImg}>
                    <Image.Group size='tiny'>
                        <Image 
                            style={profilePicture}
                            src={this.state.profile_pic} />
                    </Image.Group>
                    
                </div>
            )
        }

        const profileInfo = () => {
            const username = this.props.user.username
            return(
                <div>
                    { profileBackgrounDiv() }
                    <h1 
                        style={{fontSize: '50px'}}
                    >{ username }</h1>
                    <button onClick={this.handleEditStatus}>Edit profile?</button>
                    <br />
                    <p>ELO { this.props.user.elo }</p>
                    <p style={{fontSize: '20px'}} >About { username }! </p>
                    <p>{ this.props.user.bio }</p>
                </div>
            )
        }

        // console.log('user props?', this.props.user)
        console.log('edditing??', this.state.editting)
        return(
           <Grid>
               <Grid.Column width={3} />
               <Grid.Column width={10}>
                   { this.props.user && !this.state.editting ? profileInfo() : null }
                   { this.props.user ? null : <p>loading</p> }
                   { this.state.editting ? <ProfileEditForm /> : null}
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

const mapDispatchFromProps = dispatch => {
    return {
        loginUser: user => dispatch(loginUser(user))
    }
}

export default connect(mapStateToProps, mapDispatchFromProps)(Profile)