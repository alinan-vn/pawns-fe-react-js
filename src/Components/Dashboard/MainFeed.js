import React from 'react'
import { Container, Button, Icon } from 'semantic-ui-react'
import { saveArticles, currentArticle } from '../../Actions/articles'
import { loginUser } from '../../Actions/auth'
import { tokenValidation } from '../../Actions/userValidation'
import { connect } from 'react-redux'
import '../../App.css'
import PawnBck from '../../Images/pawn_bck.jpg'

import { withRouter } from 'react-router-dom'

class MainFeed extends React.Component {

    handleCurrentArticle = (articleId, ind) => {
        this.props.currentArticle(this.props.articles[ind])
        this.props.history.push(`/articles/${articleId}`)
    }

    articleCards = () => {
        return this.props.articles.map((article, ind) => {
            const newContent = article.content.split(' ').splice(0, 50).join(' ')
            const colors = ['#ebd6b7', '#b3b3b3']
            const colorsInv = [ '#b3b3b3', '#ebd6b7']
            const num = ind % 2

            const buttonStyle = {
                backgroundColor: colorsInv[num],
                marginBottom: '5px',
                marginLeft: '5px'
            }

            return (
                <Container fluid key={ind} >
                    <div style={{background: colors[num]}}>
                        <br />
                        <h3 className='mainFont titlePadding'>
                            { article.title }
                        </h3>
                        <p className='contentPadding contentJustify'>
                            { newContent }
                        </p>
                        <Button 
                            compact={true}

                            onClick={ () => this.handleCurrentArticle(article.id, ind) }
                            style={buttonStyle}
                        >
                            <Icon name='chess' />
                        </Button> 
                    </div>
                                       
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

        tokenValidation(this.props)
    }

    render(){

        return(
            <div className='scrollContainer mainFont'>
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