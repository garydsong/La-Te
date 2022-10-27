
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './NavBar.css'
import logo from '../assets/la-te.png'
import menu from '../assets/icons/menu-icon.svg'

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user)

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className='nav-bar-wrapper'>
        <NavLink to='/'>
        <img id="nav-bar-logo" src={logo} />
        </NavLink>
        <div className="logged-in-buttons">
        <div>
          <NavLink to={`/users/${sessionUser.id}`} exact={true} activeClassName='active'>
            <img id="nav-bar-avatar" src={sessionUser.avatar}/>
          </NavLink>
        </div>
        <div>
          <img id="nav-bar-dropdown" src={menu} />
          {/* <LogoutButton /> */}
        </div>
        </div>
      </div>
    )
  } else {
    sessionLinks = (

      <div className='nav-bar-wrapper'>
        <NavLink to='/'>
          <img id="nav-bar-logo" src={logo} />
        </NavLink>

        <div className="nav-bar-right">
        <NavLink id="login-nav-text" to='/login' exact={true} activeClassName='active'>
          <div id="login-nav-button">
            Log In
          </div>
        </NavLink>
        <NavLink id="signup-nav-text" to='/sign-up' exact={true} activeClassName='active'>
          <div id="signup-nav-button">
            Start a Page
          </div>
        </NavLink>
        </div>

      </div>
    )
  }

  return (
    <nav className='NavBar'>
      <>
        <>{sessionLinks}</>
      </>
    </nav>
  );
}

export default NavBar;
