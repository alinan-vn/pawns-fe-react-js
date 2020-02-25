import React from 'react'
import { connect } from 'react-redux'
import {currentArticle, clearArticle } from '../../Actions/articles'
import { Grid, Form, Button } from 'semantic-ui-react'


class ArticleCard extends React.Component {
    constructor(){
        super()
        this.state ={
            voteCount: 0,
            comments: []
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

    fetchVotes = () => {
        fetch(`http://localhost:3000/get_votes_and_comments/${this.props.article.id}`)
        .then(resp => resp.json())
        .then(obj => {
            console.log('correct object?', obj)
            this.setCountVotes(obj.votes)
            this.setComments(obj.comments)
        })
    }

    setCountVotes = (voteArray) => {
        this.setState({
            ...this.state,
            voteCount: voteArray.length
        })
        console.log('all votes?', voteArray)

    }

    setComments = (commentArray) => {
        this.setState({
            ...this.state,
            comments: commentArray
        })
        console.log('all comments?', commentArray)
    }

    textStyle = {
        textAlign: 'justify',
        textJustify: 'inter-word'
    }

    componentDidMount(){
        this.fetchVotes()
    }

    render(){
        return(
            <Grid>
                <Grid.Column width={4} />

                <Grid.Column width={9}>
                    <Form>
                        <h1 style={{textAlign:'center'}}>{ this.props.article.title }</h1>
                        <p>Written by: { this.props.article.author }. Posted on: { this.dateTranslator() }</p>
                        <p style={this.textStyle}>{ this.props.article.content }</p>
                        <Grid>
                            <Grid.Column width={2}>
                                <Button content={ `${this.state.voteCount}` }  />
                            </Grid.Column>
                            <Grid.Column width={14}>
                                <Form.Input placeholder='Leave a Comment!'></Form.Input>
                            </Grid.Column>
                        </Grid>
                    </Form>
                    <hr />
                    <Form>
                        <h1>Comments: </h1>
                        <p>stuff</p>
                        <p>stuff</p>
                        <p>stuff</p>
                        <p>stuff</p>
                    </Form>

                </Grid.Column>

                <Grid.Column width={4} />
                
            </Grid>
        )
    }
}


const mapStateToProps = state => {
    return {
        article: state.articleReducer.article
    }
}

const mapDispatchToProps = dispatch => {
    return {
        currentArticle: article => dispatch(currentArticle(article)),
        clearArticle: () => dispatch(clearArticle())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleCard)