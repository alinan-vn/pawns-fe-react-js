import React from 'react'
import { Container, Header, Button } from 'semantic-ui-react'
import { saveArticles, currentArticle } from '../../Actions/articles'
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
    }

    render(){
        return(
            <div>
                { console.log('this', this.props)}

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
        currentArticle: article => dispatch(currentArticle(article))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainFeed))