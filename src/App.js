import React from 'react';
import MenuBar from './Components/MenuBar'

import HomeFeed from './Components/HomeFeed'
import Tournaments from './Components/Tournaments'
import Profile from './Components/Profile'
import Login from './Components/Login'

import PlaceHolding from './Components/PlaceHolding'


import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

class App extends React.Component {

  render(){
    return(
      <Router>
        <MenuBar />
        <Route exact path ='/' component= { HomeFeed } />
        <Route exact path ='/tournaments' component= { Tournaments } />
        <Route exact path ='/profile' component= { Profile } />
        <Route exact path ='/login' component= { Login } />

        <Route exact path ='/placeholding' component= { PlaceHolding } />
        
      </Router>
    )
  }
}

export default App;
