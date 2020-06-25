import React from 'react';
import { connect } from 'react-redux';

class Article extends React.Component {
    constructor(){
        super()
        this.state = {
            article: null
        }
    }

    setArticle = () => {
        let id = this.props.history.location.pathname
        id = id.split('/')[2]
        // id = id[2]
        
        console.log(id)

    }

    componentDidMount(){
        this.setArticle()
    }

    render(){
        return(
            <div>
                ARTICLE
                { console.log(this.props.articles) }
            </div>
        )
    }
}

const maptStateToProps = state => {
    return {
        articles: state.articleReducer.articles
    }
}

export default connect(maptStateToProps)(Article)