import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignUpForm.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState('');
  const [coverImg, setCoverImg] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [website, setWebsite] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(firstName, lastName, city, state, username, email, avatar, coverImg, bio, website, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateWebsite = (e) => {
    setWebsite(e.target.value);
  };

  const updateBio = (e) => {
    setBio(e.target.value);
  };

  const updateAvatar = (e) => {
    setAvatar(e.target.value);
  };

  const updateCoverImg = (e) => {
    setCoverImg(e.target.value);
  };

  const updateCity = (e) => {
    setCity(e.target.value);
  };

  const updateState = (e) => {
    setState(e.target.value);
  };


  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  useEffect(() => {
    const err = []
    if (!firstName || firstName.length > 40) err.push("First name must be between 1 and 40 characters")
    if (!lastName || lastName.length > 40) err.push("Last name must be between 1 and 40 characters")
    if (!username || username.length > 40) err.push("Username must be between 1 and 40 characters")
    if (!email.match(/^\S+@\S+\.\S+$/)) err.push('Please enter a valid email address')
    if (!city || city.length > 20) err.push('Please enter a valid city between 1 and 20 characters')
    if (!state || state.length > 15) err.push('Please enter a valid state between 1 and 15 characters')
    if (!bio || bio.length < 2) err.push('Please tell us a little about yourself')
    if (!avatar || !coverImg) err.push('If you do not choose a valid avatar or cover image one will be provided for you')

    setErrors(err)
  }, [firstName, lastName, username, email, city, state, bio])


  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <>
      <div className="sign-up-full-page">
        <div className="whitespace-errors"></div>
        <div className="checking">
          <form id="signup-form-spacing" onSubmit={onSignUp}>
            <div className="signup-form-errors">
              {errors.map((error, ind) => (
                <div id="signuperror" key={ind}>{error}</div>
              ))}
            </div>
            <div>
              <input
                id="first-name-input"
                type='text'
                name='username'
                placeholder='First Name'
                onChange={updateFirstName}
                value={firstName}
              ></input>

              <input
                id="last-name-input"
                type='text'
                name='username'
                placeholder='Last Name'
                onChange={updateLastName}
                value={lastName}
              ></input>
            </div>

            <div>
              <input
                id="username-input"
                type='text'
                name='username'
                placeholder='Display Name'
                onChange={updateUsername}
                value={username}
              ></input>
            </div>
            <div>
              <input
                id="email-input"
                type='text'
                name='email'
                placeholder='Email Address'
                onChange={updateEmail}
                value={email}
              ></input>
            </div>

            <div>
              <input
                id="city-input"
                type='text'
                name='city'
                placeholder='City'
                onChange={updateCity}
                value={city}
              ></input>
              <input
                id="state-input"
                type='text'
                name='state'
                placeholder='State'
                onChange={updateState}
                value={state}
              ></input>
            </div>

            <div>
              <input
                id="password-input"
                type='password'
                name='password'
                placeholder='Choose a Password'
                onChange={updatePassword}
                value={password}
              ></input>
            </div>
            <div>
              <input
                id="password2-input"
                type='password'
                name='repeat_password'
                placeholder='Repeat your Password'
                onChange={updateRepeatPassword}
                value={repeatPassword}
                required={true}
              ></input>
            </div>

            <div>
              <input
                id="avatar-input"
                type='text'
                name='avatar'
                placeholder='Avatar URL (Optional)'
                onChange={updateAvatar}
                value={avatar}
              ></input>
            </div>
            <div>
              <input
                id="cover-img-input"
                type='text'
                name='cover-img'
                placeholder='Cover Image Url (Optional)'
                onChange={updateCoverImg}
                value={coverImg}
              ></input>
            </div>
            <div>
              <textarea
                id="bio-input"
                type='text'
                name='bio'
                placeholder='About me'
                onChange={updateBio}
                value={bio}
              ></textarea>
            </div>
            <div>
              <input
                id="website-input"
                type='text'
                name='website'
                placeholder='Website (Optional)'
                onChange={updateWebsite}
                value={website}
              ></input>
            </div>
            <button id="signup-input" type='submit'>Sign Up</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
