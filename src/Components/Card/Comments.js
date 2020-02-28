import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Feed, Form, Button } from 'semantic-ui-react'


class Comments extends React.Component {
    constructor(){
        super()
        this.state = {
            comments: [],
            users: []
        }
    }

    fetchComments = () => {
        fetch(`http://localhost:3000/get_votes_and_comments/${this.props.article.id}`)
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
        commentArray.map(comment => {
            this.fetchUser(comment.user_id)
        })
    }

    fetchUser = (id) => {
        return fetch(`http://localhost:3000/users/${id}`)
        .then(resp => resp.json())
        .then(user => this.setUser(user))
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

    currentUserAndCommentUser = (username, comment) => {
        if (username === this.props.user.username) {
            return(
                <button onClick={() => this.deleteComment(comment)}>Delete Comment</button>
            )
        }
    }

    setCommentCards = () => {
        return this.state.comments.map(comment => {
            const user = this.state.users.find(user => user.id === comment.user_id)
            return (
                <Feed.Event key={ comment.id }>
                    <Feed.Label>
                        <img src={ user && !(user.profile_pic === '' ) ? user.profile_pic   : 'https://react.semantic-ui.com/images/avatar/small/elliot.jpg' } />
                    </Feed.Label>
                    <Feed.Content>
                        <Feed.Summary>
                            <Feed.User>{ user ? user.username : comment.user_id}</Feed.User>
                            { user ? this.currentUserAndCommentUser(user.username, comment) : null }
                            <p><strong>{ comment.content }</strong></p>
                            <Form.Input placeholder='Reply!'></ Form.Input>
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


    render(){
        return(
            <Feed>
                <h1>Commments: </h1>
                <hr />
                { this.setCommentCards() }
            </Feed>
        )
    }
}

const mapStateToProps = state => {
    return{
        article: state.articleReducer.article,
        user: state.authReducer.user
    }
}



export default withRouter(connect(mapStateToProps)(Comments))