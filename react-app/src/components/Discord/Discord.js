import React from "react";
import './Discord.css'
import { NavLink } from "react-router-dom";
import Footer from "../Footer/Footer";
import discordlogo from "../../assets/icons/discord-logo.svg"


function Discord() {
    return (
        <>
            <div className="gradient-top-settings"></div>
            <div className="whitespace"></div>
            <div className="discord-container-page">
                <div className="discord-content-wrapper">
                    <div className="discord-top-title-wrapper">
                        <div className="discord-title">
                            <img id="disc-logo" src={discordlogo}/>Discord
                        </div>
                        <div className="discord-exp">
                            Discord is one of the best places to build an engaged community.
                        </div>
                        <div className="discord-exp">
                            There are two ways to connect Discord to your La-Té account:
                        </div>
                        <div className="discord-bul">
                            • Connect to our Discord Server to automatically reward supporters with invites and roles.
                        </div>
                        <div className="discord-bul">
                            • Display your discord username on your La-Té profile About.
                        </div>
                    </div>

                    <div className="discord-connect-wrapper">
                        <div className="connect-to-discord">
                            Connect to Discord
                        </div>

                        <a id="no-style" href="https://discord.gg/y7X8fYAsTQ" target="_blank">
                        <div className="join-our-discord">
                            Join Our Discord Server
                        </div>
                        </a>

                        <div className="join-expl">
                        Use the below option if you don't want to utilize our Discord benefits to your supporters but want to display your Discord username to others.
                        </div>

                        <NavLink id="no-style" to='/users/settings'>
                        <div className="add-your-discord">
                            Add Your Discord To Your Profile
                        </div>
                        </NavLink>

                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Discord
