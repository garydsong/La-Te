import React, { useEffect, useState } from "react";
import Footer from '../Footer/Footer'
import { useDispatch, useSelector } from "react-redux";
import { getAllLattes } from "../../store/latte"
import './UserSettings.css'
import oops from "../../assets/oops.png"
import oopspfp from "../../assets/oops-pfp.png"
import { updateUserThunk } from "../../store/session";
import { NavLink, useHistory } from "react-router-dom";

function UserSettings() {
    const sessionUser = useSelector(state => state.session.user);
    const currUserLattes = useSelector(state => state.latteReducer.user);
    const dispatch = useDispatch()
    const history = useHistory()

    const [user, setUser] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);
    const [username, setUsername] = useState(sessionUser?.username)
    const [coverImg, setCoverImg] = useState(sessionUser?.cover_img);
    const [avatarImg, setAvatarImg] = useState(sessionUser?.avatar)
    const [firstName, setFirstName] = useState(sessionUser?.first_name)
    const [lastName, setLastName] = useState(sessionUser?.last_name)
    const [city, setCity] = useState(sessionUser?.city)
    const [state, setState] = useState(sessionUser?.state)
    const [bio, setBio] = useState(sessionUser?.bio)
    const [website, setWebsite] = useState(sessionUser?.website)

    useEffect(() => {
        (async () => {
            const response = await fetch(`/api/users/${sessionUser.id}`);
            const user = await response.json();
            setUser(user);
        })();

        dispatch(getAllLattes(sessionUser.id))
            .then(() => { setIsLoaded(true) })
    }, [dispatch, coverImg, avatarImg])

    const imageOnErrorHandler = (event) => {
        event.currentTarget.src = oops;
    };

    const avatarImageOnErrorHandler = (event) => {
        event.currentTarget.src = oopspfp;
    };

    let sumLatte = 0;
    Object.values(currUserLattes).map(latte => {
        sumLatte += +latte.latte
    })

    const handleSubmit = async (e) => {
        e.preventDefault()

        const updatedUser = {
            first_name: firstName,
            last_name: lastName,
            cover_img: coverImg,
            avatar: avatarImg,
            email: sessionUser.email,
            username: username,
            city: city,
            state: state,
            bio: bio,
            website: website
        }
        console.log('updated !!!!!!!!!!!!!!!!!!', updatedUser)

        let dispatchedUser = await dispatch(updateUserThunk(updatedUser, sessionUser.id))

        if (dispatchedUser) {
            console.log('dispatched hit ----------------')
            history.push(`/users/${sessionUser.id}`)
        }

    }

    return isLoaded && (
        <>

            <div className="gradient-top-settings"></div>
            <div className="whitespace"></div>

            <div className="user-settings-wrapper">
                <div className="user-settings-container">
                    <div className="user-settings-balance-wrapper">
                        <div className="user-settings-settings-title">⚙️ Settings</div>
                        <div className="user-settings-balance-title">You have donated ${sumLatte * 4}</div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="user-settings-cover-img-wrapper">
                            <div className="absoluted-cover-img">Cover Image</div>
                            <img
                                id="cover-img-settings-page"
                                src={coverImg}
                                onError={imageOnErrorHandler}
                            />
                            <input
                                className="settings-cover-img-edit"
                                placeholder="Cover Image URL"
                                onChange={e => setCoverImg(e.target.value)}
                                value={coverImg}

                            ></input>
                        </div>

                        <div></div>
                        <div className="user-settings-top-wrapper">
                            <div className="user-settings-top-inner-container">
                                <div className="user-settings-name-ava">
                                    <img
                                        id="user-ava-settings"
                                        src={avatarImg}
                                        onError={avatarImageOnErrorHandler}
                                    />
                                    <div className="user-settings-name-display">
                                        <div className="user-settings-username">{username}</div>
                                        <div className="user-settings-first-last">{firstName} {lastName}</div>
                                        <div className="user-settings-city-state">{city}, {state}</div>
                                    </div>
                                </div>
                                <div id="input-settings-wrapper">
                                    <div className="absoluted-avatar">Avatar</div>
                                    <div className="absoluted-firstname">First Name</div>
                                    <div className="absoluted-lastname">Last Name</div>
                                    <div className="absoluted-username">Username</div>
                                    <div className="absoluted-city">City</div>
                                    <div className="absoluted-state">State</div>
                                    <input
                                        className="settings-cover-img-edit"
                                        placeholder="Avatar URL"
                                        onChange={e => setAvatarImg(e.target.value)}
                                        value={avatarImg}
                                    ></input>
                                    <div id="settings-name-edit-container">
                                        <input
                                            id="settings-edit-first-name-input"
                                            type='text'
                                            name='firstname'
                                            placeholder={firstName}
                                            readOnly
                                        // onChange={}
                                        // value={}
                                        ></input>

                                        <input
                                            id="settings-edit-last-name-input"
                                            type='text'
                                            name='lastname'
                                            placeholder={lastName}
                                            readOnly
                                        // onChange={}
                                        // value={}
                                        ></input>
                                    </div>
                                    <div id="whydoe">
                                        <input
                                            id="username-input-settings-edit"
                                            type='text'
                                            name='username'
                                            placeholder='Display Name'
                                            onChange={e => setUsername(e.target.value)}
                                            value={username}
                                        // onChange={updateUsername}
                                        // value={username}
                                        ></input>
                                    </div>

                                    <div id="settings-name-edit-container">
                                        <input
                                            id="settings-edit-city-input"
                                            type='text'
                                            name='city'
                                            placeholder='City'
                                            onChange={e => setCity(e.target.value)}
                                            value={city}
                                        ></input>
                                        <input
                                            id="settings-edit-state-input"
                                            type='text'
                                            name='state'
                                            placeholder='State'
                                            onChange={e => setState(e.target.value)}
                                            value={state}
                                        ></input>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bio-settings-top-wrapper">
                            <div className="absoluted-about">About</div>
                            <div className="bio-settings-top-inner-container">
                                <div className="user-settings-bio">
                                    <div className="bio-preview-settings">
                                        {bio}
                                    </div>
                                </div>
                                <input
                                    className="settings-about-edit"
                                    placeholder="About"
                                    onChange={e => setBio(e.target.value)}
                                    value={bio}
                                ></input>
                            </div>
                        </div>

                        <div className="website-settings-top-wrapper">
                            <div className="absoluted-website">Website</div>
                            <div className="website-settings-top-inner-container">
                                <div className="user-settings-website">
                                    <div className="website-preview-settings">
                                        {website}
                                    </div>
                                </div>
                                <input
                                    className="settings-about-edit"
                                    placeholder="Website"
                                    onChange={e => setWebsite(e.target.value)}
                                    value={website}
                                ></input>
                            </div>
                        </div>

                        <div className="submit-settings-top-wrapper">
                            <NavLink id="nav-unlink" to={`/users/${sessionUser.id}`}>
                                <button
                                    id="cancel-settings-button"
                                >

                                    Cancel
                                </button>
                            </NavLink>
                            <button id="submit-settings-button">Submit</button>
                        </div>
                    </form>

                </div>
            </div>
            <Footer />
        </>
    )
}

export default UserSettings
