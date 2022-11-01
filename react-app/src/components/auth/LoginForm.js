import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to={`/users/${user.id}`} />;
  }

  return (
    <>
      <br></br><br></br>
      <div className="gradient-top-login"></div>
      <div className="login-form-page">

        <div className="login-form-wrapper">
          <div className="login-title">Log In</div>
          <form onSubmit={onLogin}>
            <div className="errors-login">
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>
            <div className="input-field-wrapper">
              <div>
                <input
                  id="email-input"
                  name='email'
                  type='text'
                  placeholder='Email'
                  value={email}
                  onChange={updateEmail}
                />
              </div>
              <div>
                <input
                  id="password-input"
                  name='password'
                  type='password'
                  placeholder='Password'
                  value={password}
                  onChange={updatePassword}
                />
              </div>
              <div>
                <button type='submit'
                  id="login-input">Log in</button>
              </div>

            </div>

          </form>
          <NavLink id="new-to-la-te-div" to="/signup">
          <div className="signup-title">New to La-Te? Sign up here</div></NavLink>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
