import React from 'react'
import { Container, Header, Button } from 'semantic-ui-react'
import { saveArticles, currentArticle } from '../../Actions/articles'
import { loginUser } from '../../Actions/auth'
import { connect } from 'react-redux'

import { withRouter } from 'react-router-dom'

class MainFeed extends React.Component {
    constructor(props){
        super(props)
        
    }

    handleCurrentArticle = articleId => {
        this.props.currentArticle(this.props.articles[articleId])
        this.props.history.push(`/articles/${articleId}`)
    }

    articleCards = () => {
        return this.props.articles.map((article, ind) => {
            const newContent = article.content.split(' ').splice(0, 50).join(' ')
            return (
                <Container fluid key={ind}>
                    <Header as='h3'>{ article.title }</Header>
                    <p>
                        { newContent }
                    </p>
                    <Button onClick={ () => this.handleCurrentArticle(ind) } content='See More!' />                    
                    <hr />
                </Container>
            )
        })
    }

    fetchArticles = () => {

        fetch('http://localhost:3000/articles/')
        .then(resp => resp.json())
        .then(articles => this.props.saveArticles(articles))
    }


    componentDidMount(){
        this.fetchArticles()

        const token = localStorage.getItem('token')
        if (!token){
          this.props.history.push('/login')
        } else {
            const reqObj = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }


            fetch('http://localhost:3000/current_user', reqObj)
            .then(resp => resp.json())
            .then(user => {
                this.props.loginUser(user)
            })
        }
    }

    render(){
        return(
            <div>
                { this.articleCards() }
            </div> 
        )
    }
}

const mapStateToProps = state => {
    return {
        articles: state.articleReducer.articles
    }
}

const mapDispatchToProps = dispatch => {
    return {
        saveArticles: articles => dispatch(saveArticles(articles)),
        currentArticle: article => dispatch(currentArticle(article)),
        loginUser: user => dispatch(loginUser(user))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainFeed))