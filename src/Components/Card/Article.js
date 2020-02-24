import React from 'react'
import { connect } from 'react-redux'
import {currentArticle, clearArticle } from '../../Actions/articles'
import { Grid, List } from 'semantic-ui-react'


class ArticleCard extends React.Component {


    dateTranslator = () => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        let dateArray = this.props.article.date.split('-')
        let month = months[parseInt(dateArray[0])]
        let year = 2000 + parseInt(dateArray[2])
        let date = `Posted on ${month} ${dateArray[1]}, ${year}`
        // console.log('real date???', date)
        return date
    }

    render(){
        return(
            <Grid>
                <Grid.Column width={4} />
                
                <Grid.Column width={9}>
                    <h1 style={{textAlign:'center'}}>{ this.props.article.title }</h1>
                    <p>Posted on: { this.dateTranslator() }</p>
                    <p>{ this.props.article.content }</p>
                    
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