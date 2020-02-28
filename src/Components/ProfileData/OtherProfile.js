import React from 'react'
import { connect } from 'react-redux'
import { Grid, Image } from 'semantic-ui-react'
import { loginUser } from '../../Actions/auth'
import { tokenValidation } from '../../Actions/userValidation'
import ProfileEditForm from './ProfileEdit'
import { withRouter } from 'react-router-dom'

class viewProfile extends React.Component {




    

    componentDidMount(){
        tokenValidation()
        if (!this.props.currentProfile){
            this.props.history.push('/')
        }
    }

    render (){

        const profileBackgroungImg = {
            height: '100px',
            width: '100%',
            backgroundImage: `url(${this.props.profile.profile_background})`,
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
                            src={this.props.currentProfile.profile_pic} />
                    </Image.Group>
                    
                </div>
            )
        }

        const profileComp = () => {
            return(
                <Grid.Column width={10}>
                    { profileBackgrounDiv() }
                        <h1 
                            style={{fontSize: '50px'}}
                        >{ this.props.profile.username }</h1>
                        <br />
                        <p>ELO { this.props.profile.elo }</p>
                        <p style={{fontSize: '20px'}} >About { this.props.profile.username }! </p>
                        <p>{ this.props.profile.bio }</p>
                </Grid.Column>
            )
        }

        return(
            <Grid>
                <Grid.Column width={3} />

                { this.props.profile ? profileComp() : <p>Loading</p>}
                
            </Grid>
        )
    }
}

const mapStateToProps = state => {
    return {
        profile: state.profileReducer.currentProfile
    }
}

export default withRouter(connect(mapStateToProps)(viewProfile))