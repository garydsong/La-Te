import React from "react";
import { NavLink } from 'react-router-dom';
import cup from "../../assets/la-te-cup.png"
import './Footer.css'

function Footer() {
    return (
        <>
            <div className="footer-wrapper">
                <div className="top-footer-wrapper">
                    <div className="top-footer-content">
                        <NavLink to="/about">
                        <img id="top-footer-icon" src={cup} />
                        </NavLink>
                        <div className="top-footer-links">
                            <div className="top-footer-title-link">
                            Contacts
                            </div>
                            <p><a id="footer-link-dec" href="https://github.com/garydsong/La-Te">Project Repo</a></p>
                            <p><a id="footer-link-dec" href="https://github.com/garydsong/">GitHub</a></p>
                            <p><a id="footer-link-dec" href="https://www.linkedin.com/in/gary-song-96b071246/">LinkedIn</a></p>
                        </div>

                        <div className="top-footer-links">
                            <div className="top-footer-title-link">
                            My Other Projects
                            </div>
                            <p><a id="footer-link-dec" href="https://nope-yelp.herokuapp.com/">Nope</a></p>
                            <p><a id="footer-link-dec" href="https://garebnb.herokuapp.com">GareBnB</a></p>
                            <p><a id="footer-link-dec" href="https://xok3k3kob3llif3.netlify.app/">XOK3K3KOB3Llif3</a></p>
                            <p><a id="footer-link-dec" href="https://lovealarm.netlify.app/">LOVE ALARM</a></p>
                            <p><a id="footer-link-dec" href="https://gs-1.netlify.app/">GS-1</a></p>
                            <p><a id="footer-link-dec" href="https://mod4soundboard.netlify.app/">a/A Mod4 Soundboard</a></p>


                        </div>

                        <div className="top-footer-links">
                            <div className="top-footer-title-link">
                            Technologies
                            </div>
                            <p>Python</p>
                            <p>JavaScript</p>
                            <p>Flask</p>
                            <p>React</p>
                            <p>Redux</p>
                            <p>Postgres</p>
                            <p>SQLite3</p>
                            <p>CSS3</p>
                            <p>Heroku</p>
                        </div>

                        <div className="top-footer-links">
                            <div className="top-footer-title-link">
                            S/O June Squad
                            </div>
                            <p>Michael Jung  - <a id="footer-link-dec" href="https://escape-hatch.herokuapp.com/">Escape Hatch</a></p>
                            <p>Amanda Vien - <a id="footer-link-dec" href="https://slate-canva.herokuapp.com/">Slate</a></p>
                            <p>Jack Fisher - <a id="footer-link-dec" href="https://dancefam.herokuapp.com/">Dance Fam</a></p>
                            <p>Brandon Tasaki - <a id="footer-link-dec" href="https://pearbnb-final.herokuapp.com/">PearBnB</a></p>
                            <p>John Carerra - <a id="footer-link-dec" href="https://cyber-trade.herokuapp.com">Cybertrade</a></p>
                            <p>Sam Suh - <a id="footer-link-dec" href="https://youtu.be/fPgf2meEX1w?t=50">Coindex</a></p>
                            <p>Jae Hwang - <a id="footer-link-dec" href="https://drink-cawfee.herokuapp.com/">Drink Cawfee</a></p>
                            <p>Jake Matillano - <a id="footer-link-dec" href="https://kalmado.herokuapp.com/">Kalmado</a></p>
                            <p>Alex Dam - <a id="footer-link-dec" href="https://sawdat.herokuapp.com/">Sawdat</a></p>
                            <p>Logan Seals - <a id="footer-link-dec" href="https://large-logan.herokuapp.com/">Large</a></p>
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
