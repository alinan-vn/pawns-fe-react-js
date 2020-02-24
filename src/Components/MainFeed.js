import React from 'react'
import { Container, Header, Button } from 'semantic-ui-react'
import { saveArticles } from '../Actions/articles'
import { connect } from 'react-redux'

class MainFeed extends React.Component {
    constructor(){
        super()
        this.state = {
            
        }
    }

    articleCards = () => {
        console.log('articles propped?', this.props)
        // return this.props.articles.map((article, ind) => {
        //     return (
        //         <Container fluid key={ind}>
        //             <Header as='h3'>{ article.title }</Header>
        //             <p>
        //                 { article.content }
        //             </p>
        //             <Button content='See More!'></Button>                    
        //             <hr />
        //         </Container>
        //     )
        // })
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
                { this.props.articles ? this.articleCards() : null }
            </div> 
        )
    }
}

const mapStateToProps = state => {
    return {
        articles: state.articles
    }
}

const mapDispatchToProps = dispatch => {
    return {
        saveArticles: articles => dispatch(saveArticles(articles))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainFeed)