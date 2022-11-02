import React from "react";
import './Discover.css'
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Footer from "../Footer/Footer";
import nopfp from "../../assets/pfp/nopicpfp.png"
import nocover from "../../assets/onerrorimg/coverimg.jpeg"

function Discover() {
    const [users, setUsers] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);


    const pfpImageOnErrorHandler = (event) => {
        event.currentTarget.src = nopfp;
    };

    const coverImageOnErrorHandler = (event) => {
        event.currentTarget.src = nocover;
    };

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/users/');
            const responseData = await response.json();
            setUsers(responseData.users);
        }
        fetchData()
            .then(setIsLoaded(true))
    }, []);


    return isLoaded && (
        <>
            <div className="whitespace"></div>
            <div className="discover-page-wrapper">
                <div className="discover-page-grid-container">
                    <div className="discover-title">
                        $150M Given to All Kinds of Creators!
                    </div>
                    <div className="discover-page-grid">
                        {users.map((user) => {
                            return (
                                <NavLink id="no-styling-navlink" to={`/users/${user.id}`}>
                                    <div className="discover-page-user-cards">
                                        <img
                                        id="discover-user-cover-img"
                                        src={user.cover_img}
                                        onError={coverImageOnErrorHandler}
                                         />
                                        <img
                                        id="discover-user-avatar"
                                        src={user.avatar}
                                        onError={pfpImageOnErrorHandler}
                                        />
                                        <div className="discover-user-username">
                                            {user.username}
                                        </div>
                                        <div className="discover-user-first-last-name">
                                            {user.first_name} {user.last_name}
                                        </div>
                                        <div className="discover-user-bio">
                                            {user.bio}
                                        </div>
                                    </div>
                                </NavLink>
                            )
                        })}

                        {/* <h1>User List: </h1>
                    <ul>{userComponents}</ul> */}
                    </div>
                </div>

            </div>
            <div className="whitespace"></div>
            <Footer />
        </>
    );
}

export default Discover
