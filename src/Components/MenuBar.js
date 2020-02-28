import React from 'react';
import { Dropdown, Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutUser } from '../Actions/auth';

class MenuBar extends React.Component {

    logging = () => {
      if (this.props.user){
        localStorage.clear()
        this.props.logoutUser()
      }
    }
    
  render(){
    const link = {
        width: '100px',
        padding: '12px',
        margin: '0 6px 6px',
        fontWeight: 'bold',
        background: 'azure',
        textAlign: 'center'
    }

    return(
      <Menu>


        <NavLink
            to = '/'
            exact
            style = {link}
            className = "item"
            activeStyle = {{
              background: 'aquamarine'
            }}
        >
            pawns
        </NavLink>
        <NavLink
            to = '/tournaments'
            exact
            style = {link}
            className = "item"
            activeStyle = {{
              background: 'aquamarine'
            }}
        >
            Tournaments
        </NavLink>
        
        <Dropdown text='Top Ten' pointing className='link item'>
            <Dropdown.Menu>
            <NavLink
            to = '/placeholding'
            exact
            style = {link}
            className = "item"
            activeStyle = {{
              background: 'aquamarine'
            }}
            >
                Players
            </NavLink>
            <NavLink
            to = '/placeholding'
            exact
            style = {link}
            className = "item"
            activeStyle = {{
              background: 'aquamarine'
            }}
            >
                Puzzles
            </NavLink>
            <NavLink
            to = '/placeholding'
            exact
            style = {link}
            className = "dropdown item"
            activeStyle = {{
              background: 'aquamarine'
            }}
            >
                Games
            </NavLink>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown text='Database' pointing className='link item'>
          <Dropdown.Menu>
          <NavLink
            to = '/placeholding'
            exact
            style = {link}
            className = "item"
            activeStyle = {{
              background: 'aquamarine'
            }}
            >
                Players
            </NavLink>
            <NavLink
            to = '/placeholding'
            exact
            style = {link}
            className = "item"
            activeStyle = {{
              background: 'aquamarine'
            }}
            >
                Puzzles
            </NavLink>
            <NavLink
            to = '/placeholding'
            exact
            style = {link}
            className = "dropdown item"
            activeStyle = {{
              background: 'aquamarine'
            }}
            >
                Games
            </NavLink>
          </Dropdown.Menu>
        </Dropdown>

        <Menu.Menu position='right'>
            <NavLink
                to = '/profile'
                exact
                style = {link}
                className = "item"
                activeStyle = {{
                background: 'aquamarine'
                }}
            >
                Profile
            </NavLink>
            <NavLink
                to = '/login'
                exact
                style = {link}
                className = "item"
                activeStyle = {{
                background: 'aquamarine'
                }}
                onClick={ () => this.logging() }
              >
                { this.props.user ? 'Logout' : 'Login/SignUp' }
            </NavLink>
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
    logoutUser: () => dispatch(logoutUser())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuBar)
