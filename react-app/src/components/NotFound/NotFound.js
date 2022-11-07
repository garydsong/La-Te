import React from "react";
import './NotFound.css'
import img from "../../assets/404.jpg"

function NotFound() {
    return (
        <>
            <div className="whitespace"></div>
            <div className="fof-wrapper">
                <div className="fof-sorry">
                    Oops! Looks like you're not accessing the right URL!
                </div>
                <img id="fof-img" src={img} />
                <div className="fof-sorry">
                    Please click the top left logo to return home!
                </div>
            </div>
        </>
    )
}

export default NotFound
