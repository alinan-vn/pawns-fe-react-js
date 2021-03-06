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
                            // className='buttonStyle'
                            style={{backgroundColor: colorsInv[num], marginLeft: '5px', marginBottom: '5px'}}
                        >
                            <Icon name='chess' />
                        </Button> 
                        { this.props.user ? this.editButton(colorsInv[num], article.author, article.id) : null }
                        { this.props.user ? this.deleteButton(colorsInv[num], article.author) : null }
                    </div>                  
                    <hr />
                </Container>
            )
        })
    }

    editButton = (color, author, articleId) => {
        if(this.props.user.username === author){
            return(
                <Button
                    compact={true}
                    // className='buttonStyle'
                    onClick={() => this.handleEdit(articleId)}
                    style={{backgroundColor: color}}
                >
                    Edit
                </Button>
            )
        }
    }

    handleEdit = (articleId) => {
        this.props.history.push(`/edit-article/${articleId}`)
    }

    deleteButton = (color, author) => {
        if(this.props.user.username === author){
            return(
                <Button
                    compact={true}
                    // className='buttonStyle'
                    style={{backgroundColor: color}}
                >
                    Delete
                </Button>
            )
        }
    }

    fetchArticles = () => {
        fetch('https://enigmatic-gorge-45286.herokuapp.com/articles')
        .then(resp => resp.json())
        .then(articles => this.props.saveArticles(articles))
    }

    tokenValidation = (props) => {
        const token = localStorage.getItem('token')
        if(!token){
            alert("Please log in (username: 'mark', password: 'guest') or create an account to view further content")
        }else {
            const reqObj = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
    
            fetch('https://enigmatic-gorge-45286.herokuapp.com/current_user', reqObj)
            .then(resp => resp.json())
            .then(user => {
                props.loginUser(user)
            })
        }
    }

    componentDidMount(){
        this.fetchArticles()
        this.tokenValidation(this.props)
    }

    render(){
        return(
            <section className='main-feed'>
                <h1>Pawns!</h1>
                { this.articleCards() }
            </section>
            // <div className='scrollContainer mainFont' style={{opacity: '.9'}}>
            //     { this.articleCards() }
            // </div> 
        )
    }
}

const mapStateToProps = state => {
    return {
        articles: state.articleReducer.articles,
        user: state.authReducer.user
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