import React from 'react';
import MenuBar from './Components/MenuBar'

import HomeFeed from './Components/Dashboard/HomeFeed'
import Tournaments from './Components/Tournaments'
import Profile from './Components/Profile'
import Login from './Components/Login'
import Article from './Components/Card/Article'

import PlaceHolding from './Components/PlaceHolding'

import { connect } from 'react-redux'

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

class App extends React.Component {
  

  render(){
    return(
      <Router>
        {/* {console.log('APP', this.props.currentUser)} */}
        <MenuBar />
        <Route exact path ='/' component= { HomeFeed } />
        <Route exact path ='/tournaments' component= { Tournaments } />
        <Route exact path ='/profile' component= { Profile } />
        <Route exact path ='/login' component= { Login } />
        {/* <Route exact path ='/logout' component= { Login } /> */}

        <Route exact path ='/articles/:id' component= { Article} />

        <Route exact path ='/placeholding' component= { PlaceHolding } />
        
      </Router>
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
