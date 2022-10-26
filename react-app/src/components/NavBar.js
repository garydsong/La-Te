
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './NavBar.css'
import logo from '../assets/la-te.png'

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user)

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className='nav-bar-wrapper'>
        <img id="nav-bar-logo" src={logo} />
        <div>
          <LogoutButton />
        </div>
        <div>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
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
