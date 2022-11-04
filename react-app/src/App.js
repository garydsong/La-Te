import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import UserSettings from './components/UserSettings/UserSettings';
import SplashPage from './components/SplashPage/SplashPage';
import { authenticate } from './store/session';
import EditPost from './components/EditPost/EditPost';
import Discover from './components/Discover/Discover';
import UsersLattes from './components/UsersLattes/UsersLattes';
import AboutMe from './components/AboutMe/AboutMe';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
     <Route path="/about" exact={true}>
      <AboutMe/>
    </Route>

<NavBar />
      <Switch>
        <Route path='/' exact={true} >
          <SplashPage />
        </Route>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <Route path='/users/posts/:postId' exact={true}>
          <EditPost />
        </Route>
        <Route path='/discover' exact={true}>
          <Discover />
        </Route>
        <Route path='/userslattes' exact={true} >
          <UsersLattes />
        </Route>
        {/* <ProtectedRoute path='/users/settings' exact={true} >
          <UserSettings />
        </ProtectedRoute> */}
        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
