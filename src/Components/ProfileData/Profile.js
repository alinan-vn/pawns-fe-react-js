import React from 'react'
import { connect } from 'react-redux'
import { Grid, Image, Button } from 'semantic-ui-react'
import { loginUser } from '../../Actions/auth'
import { tokenValidation } from '../../Actions/userValidation'
import ProfileEditForm from './ProfileEdit'
import ProfileComments from './ProfileComments'
import { withRouter } from 'react-router-dom'
import '../../App.css'


class Profile extends React.Component {
    constructor(){
        super()
        this.state = {
            profile_background: '',
            profile_pic: ''
        }
    }

    setProfilePicAndBackground = () => {
        if (this.props.user){
            this.setState({
                ...this.state,
                profile_background: this.props.user.profile_background,
                profile_pic: this.props.user.profile_pic
            })
        }    
    }

    handleEditStatus = () => {
        this.props.history.push('/edit-profile')
    }

    checkProfilePicAndBack = () => {
        if (this.state.profile_pic === ''){
            this.setState({
                ...this.state,
                profile_pic: 'https://react.semantic-ui.com/images/avatar/small/elliot.jpg'
            })
        }
        if (this.state.profile_background === ''){
            this.setState({
                ...this.state,
                profile_background: 'https://pic1.zhimg.com/v2-2639b252d8c714a382664247382f3be8_r.jpg'
            })
        }
    }

    profileBackGround = () => {
        // returns background and profile pic is props.user is valid
    }

    componentDidMount(){
        tokenValidation(this.props)
        // console.log('did mount', this.props.user)
        this.setProfilePicAndBackground()
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
                        className='mainFont'
                    >{ username }</h1>
                    <Button 
                        onClick={this.handleEditStatus}
                        compact={true}
                    >
                        Edit profile?
                    </Button>
                    <br />
                    <p>ELO { this.props.user.elo }</p>
                    <p style={{fontSize: '20px'}} >About { username }! </p>
                    <p>{ this.props.user.bio }</p>
                </div>
            )
        }
        
        return(
           <Grid className='mainFont' style={{opacity: '.8'}} >
                { this.checkProfilePicAndBack() }
    
               <Grid.Column width={3} />
               <Grid.Column width={10} style={{background: '#ebd6b7'}}>
                   { this.props.user && !this.state.editting ? profileInfo() : null }
                   { this.props.user ? null : <p>loading</p> }
                   { this.state.editting ? <ProfileEditForm /> : null}
                   
                   <hr />
                   <ProfileComments />

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

export default withRouter(connect(mapStateToProps, mapDispatchFromProps)(Profile))