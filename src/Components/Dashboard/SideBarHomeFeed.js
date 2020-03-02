import React from 'react'
import { Header, List } from 'semantic-ui-react'
import '../../App.css'
import { withRouter } from 'react-router-dom'

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
            console.log(json.response.docs)
            this.setArticlesState(json.response.docs)
            // return this.articleCards(json.response.docs)
        })
    }

    setArticlesState = (json) => {
        this.setState({
            articles: json
        })
    }

    directToNYTArticle = (url) => {
        console.log('url for nyt', this.props.history)
        console.log('correct url?', url)
        window.open(url)
    }

    contentReducer = string => {
        let stringArray = string.split(' ')
        stringArray = stringArray.splice(0, 20)
        let content = stringArray.join(' ')
        return content
    }

    articleCards = () => {
        return this.state.articles.map((article, ind) => {
            return (
                <List.Item key={ind}>
                    <List.Icon name='chess pawn' size='large' verticalAlign='middle' />
                    <List.Content>
                    <List.Header 
                        onClick={() => this.directToNYTArticle(article.web_url)} 
                        as='a'
                        className='mainFont'
                    >
                        { article.headline.main }</List.Header>
                    <List.Description as='a'>{ this.contentReducer(article.abstract) }</List.Description>
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
            <div>
                <Header as='h3' style={{textAlign: 'center'}}>NYT Articles!</Header>
                <List  
                    className='scrollContainer mainFont'
                    divided relaxed
                >
                    { this.articleCards() }
                </List>
            </div>
            
        )
        
    }
}

export default withRouter(SideBarHomeFeed)