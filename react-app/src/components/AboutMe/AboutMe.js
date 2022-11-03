import React from "react";
import { useState } from "react";
import mainpic from "../../assets/midpic.png"
import './AboutMe.css'

function AboutMe() {
    const [opacityChange, setOpacityChange] = useState(0)
    const [nextSetOpacityChange, setNextSetOpacityChange] = useState(0)
    return (
        <>
            <div className="main-div-about-me-wrapper">
                <div className="line-up-img">
                    <img id="about-me-img" src={mainpic} />
                    <div className="gradient-left">
                        {/* <div className="light-about-me">
                            I'm still learning about me
                        </div> */}
                        <div
                            className="light-about-me"
                            style={{ opacity: `${opacityChange}` }}
                            onClick={() => { setOpacityChange(0); setNextSetOpacityChange(1) }}>

                            <div class="words word-1">
                                <span>D</span>
                                <span>O</span>
                            </div>

                            <div class="words word-2">
                                <span>W</span>
                                <span>H</span>
                                <span>A</span>
                                <span>T</span>
                            </div>

                            <div class="words word-3">
                                <span>Y</span>
                                <span>O</span>
                                <span>U</span>
                            </div>

                            <div class="words word-3">
                                <span>L</span>
                                <span>O</span>
                                <span>V</span>
                                <span>E</span>
                            </div>

                        </div>

                        <div
                            className="light-about-me-continue"
                        >
                            This is a test #4
                        </div>
                    </div>
                    <div className="white-right">
                        <div className="dark-about-me"
                            onClick={(() => setOpacityChange(1))}
                        >
                            I'm still learning to know myself
                        </div>
                        <div className="dark-about-me-continue"
                            // onClick={(() => setOpacityChange(1))}
                            style={{ opacity: `${nextSetOpacityChange}` }}>
                            This is a test #3
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AboutMe
