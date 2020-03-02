import React from 'react'
import { connect } from 'react-redux'
import {currentArticle, clearArticle, passCleanState } from '../../Actions/articles'
import { Grid, Form, Button } from 'semantic-ui-react'
import { tokenValidation } from '../../Actions/userValidation'
import { loginUser } from '../../Actions/auth'
import Comments from './Comments'

class ArticleCard extends React.Component {
    constructor(){
        super()
        this.state ={
            article: null,
            voteCount: 0,
            showCommentForm: false,
            comment: ''
        }
    }


    dateTranslator = () => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        let dateArray = this.props.article.date.split('-')
        let month = months[parseInt(dateArray[0])]
        let year = 2000 + parseInt(dateArray[2])
        let date = `Posted on ${month} ${dateArray[1]}, ${year}`
        return date
    }

    fetchArticles = () => {
        fetch('http://localhost:3000/articles/')
        .then(resp => resp.json())
        .then(articles => this.props.saveArticles(articles))
    }

    fetchVotes = () => {
        console.log('que', this.props.match.params.id)
        fetch(`http://localhost:3000/get_votes_and_comments/${this.props.match.params.id}`)
        .then(resp => resp.json())
        .then(obj => {
            this.setCountVotes(obj.votes)
        })
    }

    setCountVotes = (voteArray) => {
        this.setState({
            ...this.state,
            voteCount: voteArray.length
        })
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
            this.fetchVotes()
        })           
    }

    showCommentForm = () => {
        this.setState(prevState => {
            return({
                ...this.state,
                showCommentForm: !prevState.showCommentForm
            })
        })
    }

    commentForm = () => {
        return (
            <Form>
                <Form.TextArea 
                    placeholder='Leave a comment!'
                    content={this.state.comment} 
                    onChange={this.handleCommentChange} 
                />
                <Form.Button onClick={this.saveComment}>Submit</Form.Button>
            </Form>
        )
    }

    textStyle = {
        textAlign: 'justify',
        textJustify: 'inter-word'
    }

    setCurrentArticle = () => {
        fetch(`http://localhost:3000/comments/${this.props.match.params.id}`)
        .then(resp => resp.json())
        .then(obj => {
            this.props.currentArticle(obj)
        })
    }

    componentDidMount(){
        // console.log('match', this.props.match)
        // this.setCurrentArticle()
        this.fetchVotes()
        tokenValidation(this.props)
    }

    render(){
        return(
            <Grid>
                <Grid.Column width={4} />
                    { console.log('checking article props', this.props.match.params.id) }
                <Grid.Column width={9}>
                    <p>{this.props.match.params.id}</p>
                    <div>
                        <h1 style={{textAlign:'center'}}>{ this.props.article.title }</h1>
                        <p>Written by: { this.props.article.author }. Posted on: { this.dateTranslator() }</p>
                        <p style={this.textStyle}>{ this.props.article.content }</p>
                        <Grid>
                            <Grid.Column width={2}>
                                <Button content={ `${this.state.voteCount}` }  />
                            </Grid.Column>

                            <Grid.Column width={14}>
                                { this.state.showCommentForm ? this.commentForm() : <Button content='Leave a Comment?' onClick={ this.showCommentForm } />}                              
                            </Grid.Column>
                        </Grid>
                    </div>
                    <hr />

                        <Comments />

                </Grid.Column>

                <Grid.Column width={4} />
                
            </Grid>
        )
    }
}


const mapStateToProps = state => {
    return {
        article: state.articleReducer.article,
        articles: state.articleReducer.articles,
        user: state.authReducer.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        currentArticle: article => dispatch(currentArticle(article)),
        clearArticle: () => dispatch(clearArticle()),
        passCleanState: (json) => dispatch(passCleanState(json)),
        loginUser: user => dispatch(loginUser(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleCard)