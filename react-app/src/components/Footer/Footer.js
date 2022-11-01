import React from "react";
import cup from "../../assets/la-te-cup.png"
import './Footer.css'

function Footer() {
    return (
        <>
            <div className="footer-wrapper">
                <div className="top-footer-wrapper">
                    <div className="top-footer-content">
                        <img id="top-footer-icon" src={cup} />
                        <div className="top-footer-links">
                            <div className="top-footer-title-link">
                            Features
                            </div>
                            <p>Donations</p>
                            <p>Memberships</p>
                            <p>La-Té Shop</p>
                            <p>La-Té Commissions</p>
                            <p>Discord Integration</p>
                            <p>Gold</p>
                            <p>Patreon Alternative</p>
                        </div>

                        <div className="top-footer-links">
                            <div className="top-footer-title-link">
                            Use La-Té With
                            </div>
                            <p>Nope</p>
                            <p>GareBnB</p>
                            <p>Twitch</p>
                            <p>YouTube</p>
                            <p>Medium</p>
                            <p>Facebook</p>
                            <p>GitHub</p>
                            <p>Discord</p>
                        </div>

                        <div className="top-footer-links">
                            <div className="top-footer-title-link">
                            Help & Support
                            </div>
                            <p>Brand Assets</p>
                            <p>La-Té Blog</p>
                            <p>Help</p>
                            <p>WordPress Plugin</p>
                            <p>Creator Academy</p>
                        </div>

                        <div className="top-footer-links">
                            <div className="top-footer-title-link">
                            S/O June Squad
                            </div>
                            <p>Michael Jung  - <a href="https://escape-hatch.herokuapp.com/">Escape Hatch</a></p>
                            <p>Amanda Vien - <a href="https://slate-canva.herokuapp.com/">Slate</a></p>
                            <p>Jack Fisher - <a href="https://dancefam.herokuapp.com/">Dance Fam</a></p>
                            <p>Brandon Tasaki - <a href="https://pearbnb-final.herokuapp.com/">PearBnB</a></p>
                            <p>John Carerra - </p>
                            <p>Sam Suh - </p>
                            <p>Jae Hwang - </p>
                            <p>Jake Matillano - <a href="https://tunenimbus.herokuapp.com/">Tunenimbus</a></p>
                            <p>Alex Dam - </p>
                            <p>Logan Seals - </p>
                        </div>
                    </div>
                </div>
                <div className="bottom-footer-wrapper">
                    <div className="bottom-footer-content">
                        <div className="bottom-footer-tagline">La-Té Labs ©2022 Gary Song @4ever</div>
                        <div className="bottom-footer-icon-container">
                            <a href="https://www.linkedin.com/in/gary-song-96b071246/" target="_blank">
                                <img src="https://i.imgur.com/2ffGJqj.png" id="bottom-footer-icons"></img>
                            </a>
                            <a href="https://www.github.com/garydsong" target="_blank">
                                <img src="https://i.imgur.com/w9xwrCT.png" id="bottom-footer-icons"></img>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer
