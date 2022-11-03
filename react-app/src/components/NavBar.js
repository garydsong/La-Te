
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Link, useHistory } from 'react-router-dom';
import * as sessionActions from "../store/session"
import LogoutButton from './auth/LogoutButton';
import './NavBar.css'
import logo from '../assets/la-te.png'
import menu from '../assets/icons/menu-icon.svg'
import disc from '../assets/icons/earth-icon.svg'
import inb from '../assets/icons/in-icon.svg'
import defaultpfp from '../assets/pfp/nopicpfp.png'

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user)
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch()
  const history = useHistory()

  const imageOnErrorHandler = (event) => {
    event.currentTarget.src = defaultpfp;
  };

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true)
  }

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);


  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/')
  };


  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className='nav-bar-wrapper'>
        <NavLink to='/'>
          <img id="nav-bar-logo" src={logo} />
        </NavLink>
        <div className="logged-in-buttons">
          <div className="logged-in-container">
            <NavLink id="your-page-text-dec" to={`/users/${sessionUser.id}`} exact={true} activeClassName='active'>
              <div className="your-page-button">
                <img
                id="nav-bar-avatar"
                src={sessionUser.avatar}
                onError={imageOnErrorHandler}
                />
                <div className="your-page">Your Page</div>
              </div>
            </NavLink>
          </div>


          <div>
            <img id="nav-bar-dropdown" src={menu} onClick={openMenu} />
            {/* <LogoutButton /> */}
            {showMenu &&
              <div id="dropdown-parent-container">
                <div id="dropdown-upper-div">
                  <div id="dropdown-sections">
                    <div className="dropdown-top-sections" id="profile-username">
                      Hello, {sessionUser.username}!
                    </div>
                  </div>
                  <div id="dropdown-links-container">
                    <NavLink id="discover-link" to={`/discover`}>
                      <div className="dropdown-links" id="dropdown-links-business-navbar">
                        <img
                        className='icon-img-asset'
                        id="icon-img-business-navbar"
                        alt='abt me'
                        src={disc}
                        onError={imageOnErrorHandler}
                        />
                        <div>Discover</div>
                      </div>
                    </NavLink>

                    <NavLink id="discover-link" to={`/userslattes`}>
                      <div className="dropdown-links" id="dropdown-links-business-navbar">
                        <img
                        className='icon-img-asset'
                        id="icon-img-business-navbar"
                        alt='abt me'
                        src={inb}
                        onError={imageOnErrorHandler}
                        />
                        <div>Inbox</div>
                      </div>
                    </NavLink>


                    <div onClick={logout} className="dropdown-links" id="dropdown-links-business-navbar">
                      <img className='icon-img-asset' id="icon-img-business-navbar" alt='logout icon' src={menu} />
                      <div >Log Out</div>
                    </div>
                  </div>
                </div>
              </div>
            }
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
