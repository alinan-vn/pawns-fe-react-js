import React from 'react'
import { Header, List, Grid, Loader } from 'semantic-ui-react'
import '../../App.css'
import { withRouter } from 'react-router-dom'
import PawnSketch from '../../Images/pawn_sketch_2.jpeg'

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
            // console.log('nyt feed', json.response.docs )
            this.setArticlesState(json.response.docs)
        })
    }

    setArticlesState = (json) => {
        this.setState({
            articles: json
        })
    }

    directToNYTArticle = (url) => {
        window.open(url)
    }

    contentReducer = string => {
        let stringArray = string.split(' ')
        stringArray = stringArray.splice(0, 20)
        let content = stringArray.join(' ')
        return content
    }

    checkLength = (length) => {
        if (length === 0){
            return false
        } else {
            return true
        }
    }

    articleCards = () => {
        // const colors = ['#E6BE8A', '#D3D3D3']
        const colors = [ '#b3b3b3', '#ebd6b7']
        const colorsInv = [  '#ebd6b7', '#b3b3b3']


        return this.state.articles.map((article, ind) => {
            let num = ind % 2
            let arr = article.multimedia[0]
            
            return (
               <Grid key={ind} style={{background: colors[num]}}>
                   <Grid.Column width={1} />
                   <Grid.Column width={4}>
                       { this.checkLength(article.multimedia.length) ? <img src={`https://static01.nyt.com/${arr.url}`} style={{maxWidth: '100%', height: 'auto'}} /> : <img src={PawnSketch} style={{maxWidth: '100%', height: 'auto'}} /> }
                        
                   </Grid.Column>

                   <Grid.Column width={9}>
                       <List.Item>
                            <List.Content>
                            <a 
                                onClick={() => this.directToNYTArticle(article.web_url)} 
                                className='mainFont contentJustify'
                            >
                                { article.headline.main }</a>
                            <List.Description>{ this.contentReducer(article.abstract) }</List.Description>
                            </List.Content>
                        </List.Item>
                   </Grid.Column>
                    
               </Grid>
                        
                
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
                    { (this.state.articles.length === 0) ? <Loader active inline /> : this.articleCards() }
                </List>
            </div>
            
        )
        
    }
}

export default withRouter(SideBarHomeFeed)