import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Feed, Form, Button, Loader } from 'semantic-ui-react'
import { currentProfile } from '../../Actions/user'
import '../../App.css'


class Comments extends React.Component {
    constructor(){
        super()
        this.state = {
            comments: [],
            users: [],
            showCommentForm: false,
            comment: ''
        }
    }

    fetchComments = () => {
        fetch(`http://localhost:3000/get_votes_and_comments/${this.props.match.params.id}`)
        .then(resp => resp.json())
        .then(obj => {
            this.setComments(obj.comments)
        })
    }

    setComments = (commentArray) => {
        this.setState({
            ...this.state,
            comments: commentArray
        })
        commentArray.forEach(comment => {
            this.fetchUser(comment.user_id)
        })
    }

    fetchUser = (id) => {
        return fetch(`http://localhost:3000/users/${id}`)
        .then(resp => resp.json())
        .then(user => this.setUser(user))
    }

    pushProfile = (id) => {
        fetch(`http://localhost:3000/users/${id}`)
        .then(resp => resp.json())
        .then(user => {
            console.log('fetching a user?', user)
            this.props.setProfile(user)
        })

        this.props.history.push(`/users/${id}`)
    }  

    setUser = (user) => {
        this.setState(prevState => {
            return {
                ...prevState,
                users: [...prevState.users, user]
            }
        })
    }

    deleteComment = (comment) => {
        // console.log('comment is one?', comment)
        const commentObj = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(comment)
        }

        fetch(`http://localhost:3000/comments/${comment.id}`, commentObj)
        .then(resp => resp.json())
        .then(json => {this.fetchComments()})
    }

    handleCommentChange = (event) => {
        this.setState({
            comment: event.target.value
        })
    }

    saveComment = (e) => {
        const commentData = {
            content: this.state.comment,
            article_id: this.props.article.id,
            user_id: this.props.user.id
        }

        this.showCommentForm() // gets rid of comment form

        const commentObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(commentData)
        }

        fetch('http://localhost:3000/comments', commentObj)
        .then(resp => resp.json())
        .then(json => {
            this.fetchComments()
        })           
    }

    commentForm = () => {
        return (
            <Form>
                <Form.TextArea 
                    placeholder='Leave a comment!'
                    content={this.state.comment} 
                    onChange={this.handleCommentChange} 
                    style={this.commentFormStyle}
                    className='mainFont'
                />
                <Form.Button 
                    onClick={this.saveComment}
                    compact={true}
                    style={this.buttonStyle}
                    className='mainFont'
                >
                    Submit
                </Form.Button>
            </Form>
        )
    }

    commentFormStyle = {
        backgroundColor: '#f5eded'
    }

    buttonStyle = {
        backgroundColor: '#e3c4a8'
    }

    showCommentForm = () => {
        this.setState(prevState => {
            return({
                ...this.state,
                showCommentForm: !prevState.showCommentForm
            })
        })
    }

    currentUserAndCommentUser = (username, comment) => {
        if (username === this.props.user.username) {
            return(
                <Button 
                    onClick={() => this.deleteComment(comment)}
                    compact={true}
                    basic={true}
                    className='mainFont'
                >
                    Delete Comment
                </Button>
            )
        }
    }

    userProfile = (userId) => {
        this.pushProfile(userId)
    }

    setCommentCards = () => {
        return this.state.comments.map(comment => {
            const user = this.state.users.find(user => user.id === comment.user_id)
            return (
                <Feed.Event key={ comment.id }>
                    <Feed.Label>
                        <img className='commentIconPadding' src={ user && !(user.profile_pic === '' ) ? user.profile_pic   : 'https://react.semantic-ui.com/images/avatar/small/elliot.jpg' } />
                    </Feed.Label>
                    <Feed.Content>
                        <Feed.Summary>
                            <Feed.User 
                                onClick={() => this.userProfile(user.id)}
                            >{ user ? user.username 
                                : 
                                <Loader active inline /> }
                            </Feed.User>
                            { user ? this.currentUserAndCommentUser(user.username, comment) : null }
                            <p><strong>{ comment.content }</strong></p>
                            {/* <Form.Input placeholder='Reply!'></ Form.Input> */}
                        </Feed.Summary>
                    </Feed.Content>
                    <hr />
                </Feed.Event>
            )
        })
    }

    componentDidMount(){
        this.fetchComments()
    }

    commentsStyle = {
        backgroundColor: '#ecfffb'
    }


    render(){
        return(
            <div>
                <div>
                    { this.state.showCommentForm ? 
                    this.commentForm() : 
                    <Button 
                        content='Leave a Comment?' 
                        onClick={this.showCommentForm} 
                        compact={true}
                        style={this.buttonStyle}
                        className='mainFont'
                    />}
                    
                </div>
                <div style={this.commentsStyle}>
                    <hr />
                    <h2 className='mainFont' style={{textAlign:'center'}}>Commments</h2>
                    <br />
                    <Feed className='scrollContainer mainFont'>                  
                        { this.setCommentCards() }
                    </Feed>
                </div>
                
            </div>
            
        )
    }
}

const mapDispatchToProps = dispatch => {
    return{
        setProfile: user => dispatch(currentProfile(user))
    }
}

const mapStateToProps = state => {
    return{
        article: state.articleReducer.article,
        user: state.authReducer.user,
        currentProfile: state.profileReducer.currentProfile
    }
}



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Comments))