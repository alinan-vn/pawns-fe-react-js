import React from 'react'
import { connect } from 'react-redux'
import {currentArticle, clearArticle, passCleanState } from '../../Actions/articles'
import { Grid, Form, Button } from 'semantic-ui-react'
import { tokenValidation } from '../../Actions/userValidation'
import { loginUser } from '../../Actions/auth'
import Comments from './Comments'
import '../../App.css'

class ArticleCard extends React.Component {
    constructor(){

        super()
        this.state ={
            voteCount: 0
        }
    }

    dateTranslator = dateText => {
        let text = dateText.slice(0, 10)
        text = text.split('-')
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        let monthNum = parseInt(text[1]) - 1
        const month = months[monthNum]
        const day = parseInt(text[2])

        let date = `${month} ${day}, ${text[0]}`

        return date
    }

    fetchArticles = () => {
        fetch('http://localhost:3000/articles/')
        .then(resp => resp.json())
        .then(articles => this.props.saveArticles(articles))
    }

    fetchVotes = () => {
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

    setCurrentArticle = () => {
        fetch(`http://localhost:3000/articles/${this.props.match.params.id}`)
        .then(resp => resp.json())
        .then(obj => {
            console.log('article??', obj)
            this.props.currentArticle(obj)
        })
    }
    
    articleInfo = () => {
        const date = this.dateTranslator(this.props.article.created_at)
        const upDate = this.dateTranslator(this.props.article.created_at)

        let text = ''

        if (date === upDate){
            text = `${date}`
        } else {
            text = `${date}, updated on ${upDate}`
        }

        return(
            <div>
                <h1 className='mainFont' style={{textAlign:'center'}}>{ this.props.article.title }</h1>
                <p>Written by: { this.props.article.author }. Posted on: { text }</p>
                <p className='contentJustify'>{ this.props.article.content }</p>
            </div>
        )

    }

    componentDidMount(){
        this.setCurrentArticle()
        this.fetchVotes()
        tokenValidation(this.props)
    }

    

    render(){
        return(
            <Grid style={{opacity: '.9'}}>
                <Grid.Column width={4} />
                    
                <Grid.Column width={9} className='mainFont' style={{background: '#4592af'}}>
                    { this.props.article ? this.articleInfo() : null }
                    <br />

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