import React from 'react';
import { Menu, Image, Dropdown } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutUser, loginUser } from '../Actions/auth';
import RookSketch from '../Images/rook_sketch.png' 
import { tokenValidation } from '../Actions/userValidation'
import PawnsLogo from '../Images/pawnsOutline.png'

// import '../App.css'

class MenuBar extends React.Component {

  logging = (e, { name }) => {
    if (this.props.user){
      localStorage.clear()
      this.props.logoutUser()
      this.props.history.push(name)
    } else {
      this.props.history.push(name)
    }
  }

  handleRedirect = (e, { name }) => {
    this.props.history.push(name)
  }

  showProfile = () => {
    const menuItem = {
      background: '#808080',
      width: '100px',
      textAlign: 'center',
      padding: '12px'
    }

    if(this.props.user){
      return(
        <Menu.Item
          style={menuItem}
          name='/profile'
          onClick={this.handleRedirect}
        >
          Profile
        </Menu.Item>
      )
    }
  }

  writeArticle = () => {
    const menuItem = {
      background: '#808080',
      width: '100px',
      textAlign: 'center',
      padding: '12px'
    }

    if(this.props.user && this.props.user.writer){
      return(
        <Menu.Item
          style={menuItem}
          name='/new-article'
          onClick={this.handleRedirect}
        >
          Add an Article!
        </Menu.Item>
      )
    } else if (this.props.user){
      return(
        <Menu.Item
          style={menuItem}
          name='/new-blog'
          onClick={this.handleRedirect}
        >
          Blog about it!
        </Menu.Item>
      )
    }
  }

  componentDidMount(){
    tokenValidation(this.props)
  }

  render(){
    const menuBar = {
      height: '100%',
      width: '100%',
      background: '#A9A9A9'
    }

    const menuItem = {
      background: '#808080',
      width: '100px',
      textAlign: 'center',
      padding: '12px'
    }

    const logo = {
      backgroundImage: `url(${RookSketch})`
    }

    return(
      <Menu 
        borderless={true}
        inverted={true}
        size={"large"}
        fixed={'top'}
        style={{opacity: '0.95'}}
      >
        <Menu.Item 
          name='/'
          onClick={this.handleRedirect}
        >
          <Image 
            src={PawnsLogo} 
            // fluid={true}
            size='mini'
            circular={true}
          />
        </Menu.Item>
        <Menu.Item
          style={menuItem}
          name='/blogs'
          onClick={this.handleRedirect}
        >
          the blog
        </Menu.Item>
        
        <Menu.Menu position='right'>
          
          { this.writeArticle() }
          { this.showProfile() }

          <Menu.Item
            style={menuItem}
            name='/login'
            onClick={this.logging}
          >
            { this.props.user ? 'Logout' : 'Login/SignUp' }
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.authReducer.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logoutUser: () => dispatch(logoutUser()),
    loginUser: user => dispatch(loginUser(user))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MenuBar))