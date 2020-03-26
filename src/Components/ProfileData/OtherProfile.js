import React from 'react'
import { connect } from 'react-redux'
import { Grid, Image, Feed } from 'semantic-ui-react'
import { loginUser } from '../../Actions/auth'
import { currentProfile } from '../../Actions/user'
import { tokenValidation } from '../../Actions/userValidation'
import { withRouter } from 'react-router-dom'
import '../../App.css'

class viewProfile extends React.Component {
    constructor(){
        super()
        this.state = {
            id: null,
            profile_background: '',
            profile_pic: '',
            comments: []
        }
    }

    setProfilePicAndBackground = (user) => {
        this.setState({
            ...this.state,
            id: user.id,
            profile_background: user.profile_background,
            profile_pic: user.profile_pic
        }) 
    }

    setCurrentProfile = () => {
        fetch(`http://localhost:3000/users/${this.props.match.params.id}`)
        .then(resp => resp.json())
        .then(user => {
            this.setProfilePicAndBackground(user)
            console.log(user)
            this.setProfileComments(user)
            this.props.setProfile(user)
        })
    }

    handleCurrentArticle = (articleId) => {
        this.props.history.push(`/articles/${articleId}`)
    }

    setProfileComments = (user) => {
        fetch(`http://localhost:3000/get_comments/${user.id}`)
        .then(resp => resp.json())
        .then(comments => {
            this.setState({
                ...this.state,
                comments: comments
            })
        })
    }

    profileComments = () => {
        return this.state.comments.map((comment, ind) => {
            const colors = ['#ebd6b7', '#b3b3b3']
            const num = ind % 2
            return(
                <Feed.Event icon='chess pawn' key={comment.id} style={{background: colors[num]}}>
                    <Feed.Content  >
                        <Feed.Summary 
                            onClick={() => this.handleCurrentArticle(comment.article_id)} 
                            className='cursorPoint'
                        >
                            <p className='contentIndent'>{ comment.content }</p>
                            
                        </Feed.Summary>
                    </Feed.Content>
                    <hr />
                </Feed.Event>
            )    
        })
    }

    componentDidMount(){
        tokenValidation(this.props)
        this.setCurrentProfile()
    }

    render (){

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

        const profileComp = () => {

            let bioStyling = {
                background: '#ace6f6',
                opacity: '.8'
            }

            return(
                <Grid.Column width={10} style={bioStyling}>
                        { profileBackgrounDiv() }
                        <h1 
                            style={{fontSize: '50px'}}
                        >{ this.props.profile.username }</h1>
                        <br />
                        <p>ELO { this.props.profile.elo }</p>
                        <p style={{fontSize: '20px'}} >About { this.props.profile.username }! </p>
                        <p>{ this.props.profile.bio }</p>
                        <hr />
                        <h2 style={{textAlign: 'center'}}>Comments!</h2>
                        <hr />
                        <Feed className='scrollContainer' style={{maxHeight: '400px'}}>
                            { this.profileComments() }
                        </Feed>
                        
                </Grid.Column>
            )
        }

        return(
            <Grid>
                <Grid.Column width={3} />
                {/* { console.log('current profile correct?', this.props.currentProfile) } */}
                
                { this.props.profile ? profileComp() : <p>Loading</p>}
                
            </Grid>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loginUser: user => dispatch(loginUser(user)),
        setProfile: user => dispatch(currentProfile(user))
    }
}

const mapStateToProps = state => {
    return {
        profile: state.profileReducer.currentProfile,
        num: state.profileReducer.num
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(viewProfile))