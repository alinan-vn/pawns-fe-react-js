import React from 'react'
import { Container, Header, Button, List } from 'semantic-ui-react'

class SideBarHomeFeed extends React.Component {
    constructor(){
        super()
        this.state = {
            articles: []
        }
    }

    fetchChessArticles = () => {
        fetch('https://api.nytimes.com/svc/search/v2/articlesearch.json?q=chess&api-key=kRk2pujXahuLIIbwGH4fYQn46IfQJoJm')
        .then(resp => resp.json())
        .then(json => {
            // console.log(json.response.docs)
            this.setArticlesState(json.response.docs)
            // return this.articleCards(json.response.docs)
        })
    }

    setArticlesState = (json) => {
        this.setState({
            articles: json
        })
    }

    articleCards = () => {
        return this.state.articles.map((article, ind) => {
            return (
                <List.Item key={ind}>
                    <List.Icon name='chess pawn' size='large' verticalAlign='middle' />
                    <List.Content>
                    <List.Header as='a'>{ article.headline.main }</List.Header>
                    <List.Description as='a'>{ article.abstract }</List.Description>
                    </List.Content>
                </List.Item>
            )
        })
    }

    componentDidMount(){
        this.fetchChessArticles()
    }

    render(){
        return(
            <List divided relaxed>
                <Header as='h3'>Third Party Articles!</Header>
                { this.articleCards() }
        </List>
        )
        
    }
}

export default SideBarHomeFeed