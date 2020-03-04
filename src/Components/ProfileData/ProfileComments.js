import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Feed, Icon } from 'semantic-ui-react'
import { currentArticle } from '../../Actions/articles'
import '../../App.css'

class ProfileComments extends React.Component {
    constructor(){
        super()
        this.state = {
            comments: []
        }
    }

    setComments = () => {
        // fetch(`http://localhost:3000/get_comments/${this.props.user.id}`)
        if (this.props.user){
            fetch(`http://localhost:3000/get_comments/${this.props.user.id}`)
            .then(resp => resp.json())
            .then(comments => {
                this.setState({
                    ...this.state,
                    comments: comments
                })
            })
        }
        
    }

    handleCurrentArticle = (articleId) => {
        this.props.history.push(`/articles/${articleId}`)
    }

    commentFeed = () => {
        return this.state.comments.map(comment => {
            return(
                <Feed.Event key={comment.id}>
                    <Feed.Content>
                        <Feed.Summary onClick={() => this.handleCurrentArticle(comment.article_id)}>
                            { comment.content }
                            <hr />
                        </Feed.Summary>
                    </Feed.Content>
                </Feed.Event>
            )    
        })
    }

    componentWillMount (){
        this.setComments()
        // console.log('inside prof', this.props.user)
    }

    render(){
        return(
            <div>
                <h1>Comments!</h1>
                <hr />
                <Feed className='scrollContainer'>
                    { this.commentFeed() }
                </Feed>
            </div>
            
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.authReducer.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        currentArticle: article => dispatch(currentArticle(article))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileComments))