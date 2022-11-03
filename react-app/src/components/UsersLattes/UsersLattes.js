import React from "react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../Footer/Footer";
import { getCurrentLattes } from "../../store/latte"
import nopfp from "../../assets/pfp/nopicpfp.png"
import nocover from "../../assets/onerrorimg/coverimg.jpeg"
import inbox from "../../assets/icons/inbox-icon.svg"
import "./UsersLattes.css"

function UsersLattes() {
    const dispatch = useDispatch();
    const lattes = useSelector(state => state.latteReducer.user);
    const [users, setUsers] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    let balanceHolder = 0;
    let balance = Object.values(lattes).forEach(latte => {
        balanceHolder += latte.latte
    })

    const imageOnErrorHandler = (event) => {
        event.currentTarget.src = nopfp;
    };

    const coverImageOnErrorHandler = (event) => {
        event.currentTarget.src = nocover;
    };

    useEffect(() => {
        dispatch(getCurrentLattes())
            .then(setIsLoaded(true))
    }, [])



    return isLoaded && (
        <>
            <div className="whitespace"></div>
            <div className="users-lattes-page-wrapper">
                <div className="users-lattes-top-page-container">
                    <div className="users-lattes-inbox-title-wrapper">
                        <div id="donation-inbox">
                            <img id="inbox-img" src={inbox}/>Donation Inbox
                        </div>
                        <div id="balance">
                            Balance: ${`${balanceHolder * 4}`}
                        </div>
                    </div>
                    {lattes ? (
                        <>
                            {Object.values(lattes).reverse().map(latte => {
                                return (
                                    <div className="users-lattes-donation-wrapper">
                                        <img id="donation-wrapper-user-cover-img"
                                        src={latte?.owner?.cover_img}
                                        onError={coverImageOnErrorHandler}
                                        />
                                        <div className="donation-wrapper-cover-gradient"></div>
                                        <div className="donation-wrapper-top-half">
                                            <img
                                            id="donation-wrapper-user-avatar"
                                            src={latte?.owner?.avatar}
                                            onError={imageOnErrorHandler}
                                            />
                                            <div className="donation-wrapper-donator-info">
                                                <div className="donator-info-username">{latte?.owner?.username}</div>
                                                <div className="donator-info-firstlastname">{latte?.owner?.first_name} {latte?.owner?.last_name} </div>
                                                <div className="donator-info-citystate">{latte?.owner?.city}, {latte?.owner?.state}</div>
                                            </div>


                                        </div>
                                        <div className="donation-wrapper-bottom-half">
                                            <div className="latte-donation-amount">
                                            {`$${latte?.latte * 4} Donation`}
                                            </div>
                                            <div className="latte-donation-created-at">
                                            {latte?.created_at}
                                            </div>
                                            <div className="latte-donation-comment">
                                            "{latte?.comment}"
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </>
                    ) : (
                        <div className="users-lattes-donation-wrapper">You do not have any donations</div>
                    )}
                </div>
            </div>
            <div className="whitespace"></div>
            <div className="whitespace"></div>
            <Footer />
        </>
    )
}

export default UsersLattes
