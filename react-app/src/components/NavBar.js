
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
import set from '../assets/icons/setted-icon.svg'
import discord from '../assets/icons/discord-icon.svg'
import home from '../assets/icons/home-icon.svg'
import contact from '../assets/icons/contact-chat-icon.svg'
import defaultpfp from '../assets/pfp/nopicpfp.png';
import x from '../assets/icons/x-icon.svg'
import { useLocation } from 'react-router-dom';

import { render } from "react-dom";
import SlidingPane from "react-sliding-pane";
import "./SlidingPane.css";

const NavBar = () => {
  const location = useLocation();
  const sessionUser = useSelector(state => state.session.user)
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch()
  const history = useHistory()

  const [state, setState] = useState({
    isPaneOpen: false,
    isPaneOpenLeft: false,
  });

  console.log('location', location.pathname)
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
        {/* <div> */}
        {/* <button onClick={() => setState({ isPaneOpen: true })}>
            Click me to open right pane!
          </button> */}

        <SlidingPane
          className="some-custom-class"
          overlayClassName="some-custom-overlay-class"
          isOpen={state.isPaneOpen}
          // title="Hey, it is optional pane title.  I can be React component too."
          // subtitle="Optional subtitle."
          width="350px"
          onRequestClose={() => {
            // triggered on "<" on left top click or on outside click
            setState({ isPaneOpen: false });
          }}
        >
          <img
            id="close-sliding-pane"
            src={x}
            onClick={() => setState({ isPaneOpen: false })}
          />
          <div id="dropdown-sections">
            <div className="dropdown-top-sections" id="profile-username">
              <img className="sliding-pane-category-top-ava" src={sessionUser.avatar} />
              <div className="sliding-page-top-stack">
                <div>Hello,</div>
                <div id="session-user-un">{sessionUser.username}!</div>
              </div>

            </div>
          </div>

          <div id="dropdown-links-container">

            <NavLink id="discover-link" to={`/`}>
              <div
                className={location.pathname === "/" ? "dropdown-links-second" : "dropdown-links"} id="dropdown-links-business-navbar"
                onClick={() => setState({ isPaneOpen: false })}
              >
                <img
                  id={location.pathname === "/" ? "icon-img-business-navbar-second" : "icon-img-business-navbar"}
                  alt='abt me'
                  src={home}
                  onError={imageOnErrorHandler}
                />
                <div className="sliding-pane-category">Home</div>
              </div>
            </NavLink>

            <NavLink id="discover-link" to={`/users/${sessionUser.id}`}>
              <div
                className={location.pathname === `/users/${sessionUser.id}` ? "dropdown-links-second" : "dropdown-links"} id="dropdown-links-business-navbar"
                onClick={() => setState({ isPaneOpen: false })}
              >
                <img
                  className='icon-img-classname'
                  id="icon-img-business-navbar"
                  alt='abt me'
                  src={sessionUser.avatar}
                  onError={imageOnErrorHandler}
                />
                <div className="sliding-pane-category">Your Page</div>
              </div>
            </NavLink>

            <NavLink id="discover-link" to={`/userslattes`}>
              <div
                className={location.pathname === `/userslattes` ? "dropdown-links-second" : "dropdown-links"} id="dropdown-links-business-navbar"
                onClick={() => setState({ isPaneOpen: false })}
              >
                <img
                  className='icon-img-asset'
                  id={location.pathname === "/userslattes" ? "icon-img-business-navbar-second" : "icon-img-business-navbar"}
                  alt='abt me'
                  src={inb}
                  onError={imageOnErrorHandler}
                />
                <div className="sliding-pane-category">Inbox</div>
              </div>
            </NavLink>

            <NavLink id="discover-link" to={`/users/settings`}>
              <div
                className={location.pathname === `/users/settings` ? "dropdown-links-second" : "dropdown-links"} id="dropdown-links-business-navbar"
                onClick={() => setState({ isPaneOpen: false })}
              >
                <img
                  className='icon-img-asset'
                  id={location.pathname === "/users/settings" ? "icon-img-business-navbar-second" : "icon-img-business-navbar"}
                  alt='abt me'
                  src={set}
                  onError={imageOnErrorHandler}
                />
                <div className="sliding-pane-category">Settings</div>
              </div>
            </NavLink>

            <div id="dropdown-sections-split"></div>

            <NavLink id="discover-link" to={`/discover`}>
              <div
                className={location.pathname === `/discover` ? "dropdown-links-second" : "dropdown-links"} id="dropdown-links-business-navbar"
                onClick={() => setState({ isPaneOpen: false })}
              >
                <img
                  className='icon-img-asset'
                  id={location.pathname === "/discover" ? "icon-img-business-navbar-second" : "icon-img-business-navbar"}
                  alt='abt me'
                  src={disc}
                  onError={imageOnErrorHandler}
                />
                <div className="sliding-pane-category">Discover</div>
              </div>
            </NavLink>

            <NavLink id="discover-link" to={`/discord`}>
              <div
                className={location.pathname === `/discord` ? "dropdown-links-second" : "dropdown-links"} id="dropdown-links-business-navbar"
                onClick={() => setState({ isPaneOpen: false })}
              >
                <img
                  className='icon-img-asset'
                  id={location.pathname === "/discord" ? "icon-img-business-navbar-second" : "icon-img-business-navbar"}
                  alt='abt me'
                  src={discord}
                  onError={imageOnErrorHandler}
                />
                <div className="sliding-pane-category">Discord</div>
              </div>
            </NavLink>

            <NavLink id="discover-link" to={`/users/3`}>
              <div
                className={location.pathname === `/users/3` ? "dropdown-links-second" : "dropdown-links"} id="dropdown-links-business-navbar"
                onClick={() => setState({ isPaneOpen: false })}
              >
                <img
                  className='icon-img-asset'
                  id={location.pathname === "/users/3" ? "icon-img-business-navbar-second" : "icon-img-business-navbar"}
                  alt='abt me'
                  src={contact}
                  onError={imageOnErrorHandler}
                />
                <div className="sliding-pane-category">Contact Us</div>
              </div>
            </NavLink>


            <div onClick={logout} className="dropdown-links" id="dropdown-links-business-navbar">
              <img className='icon-img-asset' id="icon-img-business-navbar" alt='logout icon' src={menu} />
              <div className="sliding-pane-category">Log Out</div>
            </div>
          </div>
          <br />

        </SlidingPane>
        {/* </div> */}
        <NavLink to='/'>
          <img id="nav-bar-logo" src={logo} onClick={() => setState({ isPaneOpen: false })} />
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
            <img id="nav-bar-dropdown" src={menu} onClick={() => setState({ isPaneOpen: true })} />
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

                    <NavLink id="discover-link" to={`/users/settings`}>
                      <div className="dropdown-links" id="dropdown-links-business-navbar">
                        <img
                          className='icon-img-asset'
                          id="icon-img-business-navbar"
                          alt='abt me'
                          src={set}
                          onError={imageOnErrorHandler}
                        />
                        <div>Settings</div>
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
