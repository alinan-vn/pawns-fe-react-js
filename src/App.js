import React from 'react';
import MenuBar from './Components/MenuBar'
import './scss/main.scss';

import Profile from './Components/ProfileData/Profile'
import Login from './Components/Account/Login'
import CreateAccount from './Components/Account/CreateAccount'

import UserProfile from './Components/ProfileData/OtherProfile'
import EditProfile from './Components/ProfileData/ProfileEdit'

import Blogs from './Components/Blog/Blogs'
import Blog from './Components/Blog/Blog'
import newBlog from './Components/Blog/newBlog'
import editBlog from './Components/Blog/editBlog'

import HomeFeed from './Components/Dashboard/HomeFeed'
import Article from './Components/Card/Article'
import writeArticle from './Components/Writer/writeArticle'
import EditArticle from './Components/Writer/editArticle'

import { connect } from 'react-redux'

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

class App extends React.Component {

  render(){
    return(
      <Router >
        <br /><br />
        {/* {console.log('APP', this.props.currentUser)} */}
        <MenuBar />
        <Route exact path ='/' component={HomeFeed} />
        {/* <Route exact path ='/tournaments' component={Tournaments} /> */}
        <Route exact path ='/profile' component={Profile} />
        <Route exact path ='/login' component={Login} />
        <Route exact path ='/create-account' component={CreateAccount} />
        <Route exact path ='/edit-profile' component={EditProfile} />

        <Route exact path ='/new-article' component={writeArticle} />
        <Route exact path ='/edit-article/:id' component={EditArticle} />

        <Route exact path ='/articles/:id' component={Article} />
        <Route exact path='/users/:id' component={UserProfile} />

        <Route exact path='/new-blog' component={newBlog} />
        <Route exact path='/blogs' component={Blogs} />
        <Route exact path='/blog/:id' component={Blog} />
        <Route exact path='/edit-blog/:id' component={editBlog} />

      </ Router>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    article: state.articleReducer.article,
    user: state.authReducer.user
  }
}

export default (connect(mapStateToProps)(App))
