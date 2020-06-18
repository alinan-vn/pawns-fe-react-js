import React from 'react';
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import './scss/main.scss';

import Landing from './Components/landing/index';

class App extends React.Component {

  render(){
    return(
      <Router >
        <Route exact path='/' component={Landing} />
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
