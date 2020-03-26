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

    setComments = (userId) => {
        fetch(`http://localhost:3000/get_comments/${userId}`)
        .then(resp => resp.json())
        .then(comments => {
            this.setState({
                ...this.state,
                comments: comments
            })
        })
    }

    getUser = () => {
        let token = localStorage.getItem('token')
        if(!token){
            this.props.history.push('/login')
        } else {
            const tokenObj = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
            fetch('http://localhost:3000/current_user', tokenObj)
            .then(r => r.json())
            .then(user => {
                console.log('FROM PROFILE COMMENTS', user)
                this.setComments(user.id)
            })
        }
    }

    handleCurrentArticle = (articleId) => {
        this.props.history.push(`/articles/${articleId}`)
    }

    commentFeed = () => {
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

    componentWillMount (){
        this.getUser()
    }

    render(){
        return(
            <div style={{background: '#b3b3b3'}}>
                <h1 className='titlePadding mainFont' style={{textAlign: 'center'}}>Comments!</h1>
                <br />
                <Feed className='scrollContainer' style={{maxHeight: '400px'}}>
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