import React, { useEffect, useState } from "react";
import Footer from '../Footer/Footer'
import { useDispatch, useSelector } from "react-redux";
import { getAllLattes } from "../../store/latte"
import './UserSettings.css'

function UserSettings() {
    const sessionUser = useSelector(state => state.session.user);
    const currUserLattes = useSelector(state => state.latteReducer.user);
    const dispatch = useDispatch()

    const [user, setUser] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);
    const [username, setUsername] = useState(sessionUser?.username)

    useEffect(() => {
        (async () => {
            const response = await fetch(`/api/users/${sessionUser.id}`);
            const user = await response.json();
            setUser(user);
        })();

        dispatch(getAllLattes(sessionUser.id))
            .then(() => { setIsLoaded(true) })
    }, [dispatch])

    return isLoaded && (
        <>
            <div className="whitespace"></div>
            <div className="user-settings-wrapper">
                <div className="user-settings-container">
                    <div className="user-settings-settings-title">Settings</div>
                    <div className="user-settings-cover-img-wrapper">
                        <img id="cover-img-settings-page" src={sessionUser.cover_img} />
                        <input
                            className="settings-cover-img-edit"
                            placeholder="Cover Image URL"
                        ></input>
                    </div>

                    <div></div>
                    <div className="user-settings-top-wrapper">
                        <div className="user-settings-top-inner-container">
                            <div className="user-settings-name-ava">
                                <img id="user-ava-settings" src={sessionUser.avatar} />
                                <div className="user-settings-name-display">
                                    <div className="user-settings-username">{sessionUser.username}</div>
                                    <div className="user-settings-first-last">{sessionUser.first_name} {sessionUser.last_name}</div>
                                    <div className="user-settings-city-state">{sessionUser.city}, {sessionUser.state}</div>
                                </div>
                            </div>
                            <input
                                className="settings-cover-img-edit"
                                placeholder="Avatar URL"
                            ></input>
                            <div>
                                <input
                                    id="first-name-input"
                                    type='text'
                                    name='username'
                                    placeholder='First Name'
                                // onChange={}
                                // value={}
                                ></input>

                                <input
                                    id="last-name-input"
                                    type='text'
                                    name='username'
                                    placeholder='Last Name'
                                // onChange={}
                                // value={}
                                ></input>
                            </div>
                            <div>
                                <input
                                    id="username-input"
                                    type='text'
                                    name='username'
                                    placeholder='Display Name'
                                // onChange={updateUsername}
                                // value={username}
                                ></input>
                            </div>

                            <div>
                                <input
                                    id="city-input"
                                    type='text'
                                    name='city'
                                    placeholder='City'
                                    // onChange={updateCity}
                                    // value={city}
                                ></input>
                                <input
                                    id="state-input"
                                    type='text'
                                    name='state'
                                    placeholder='State'
                                    // onChange={updateState}
                                    // value={state}
                                ></input>
                            </div>
                        </div>
                    </div>

                    <div className="user-settings-top-wrapper">
                        <div className="user-settings-top-inner-container">
                            <div className="user-settings-name-ava">
                                <img id="user-ava-settings" src={sessionUser.avatar} />
                                <div className="user-settings-name-display">
                                    <div className="user-settings-username">{sessionUser.username}</div>
                                    <div className="user-settings-first-last">{sessionUser.first_name} {sessionUser.last_name}</div>
                                    <div className="user-settings-city-state">{sessionUser.city}, {sessionUser.state}</div>
                                </div>
                            </div>
                            <input
                                className="settings-cover-img-edit"
                                placeholder="Avatar URL"
                            ></input>
                            <div>
                                <input
                                    id="first-name-input"
                                    type='text'
                                    name='username'
                                    placeholder='First Name'
                                // onChange={}
                                // value={}
                                ></input>

                                <input
                                    id="last-name-input"
                                    type='text'
                                    name='username'
                                    placeholder='Last Name'
                                // onChange={}
                                // value={}
                                ></input>
                            </div>
                            <div>
                                <input
                                    id="username-input"
                                    type='text'
                                    name='username'
                                    placeholder='Display Name'
                                // onChange={updateUsername}
                                // value={username}
                                ></input>
                            </div>

                            <div>
                                <input
                                    id="city-input"
                                    type='text'
                                    name='city'
                                    placeholder='City'
                                    // onChange={updateCity}
                                    // value={city}
                                ></input>
                                <input
                                    id="state-input"
                                    type='text'
                                    name='state'
                                    placeholder='State'
                                    // onChange={updateState}
                                    // value={state}
                                ></input>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
            <Footer />
        </>
    )
}

export default UserSettings
