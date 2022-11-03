import React from "react";
import { useState } from "react";
import mainpic from "../../assets/midpic.png"
import lateicon from "../../assets/la-te-cup.png"
import giticon from "../../assets/abouticon/git-icon.svg"
import linkicon from "../../assets/abouticon/link-icon.svg"
import wwwicon from "../../assets/abouticon/www-icon.svg"
import './AboutMe.css'
import { useHistory } from "react-router-dom";

function AboutMe() {
    const history = useHistory();

    const [firstOpacityChange, setFirstOpacityChange] = useState(0);
    const [opacityChange, setOpacityChange] = useState(0);
    const [nextSetOpacityChange, setNextSetOpacityChange] = useState(0);
    const [nextNextSetOpacityChange, setNextNextSetOpacityChange] = useState(0);
    const [opacityChange2, setOpacityChange2] = useState(0);
    const [opacityChange3, setOpacityChange3] = useState(0);
    const [opacityChange4, setOpacityChange4] = useState(0);
    const [opacityChange5, setOpacityChange5] = useState(0);
    const [opacityChange6, setOpacityChange6] = useState(0);

    const [zindexSetter, setZIndexSetter] = useState(0);
    const [zindexSetter2, setZIndexSetter2] = useState(0);
    const [zindexSetter3, setZIndexSetter3] = useState(0);
    const [zindexSetter4, setZIndexSetter4] = useState(0);
    const [zindexSetter5, setZIndexSetter5] = useState(0);
    const [zindexSetter6, setZIndexSetter6] = useState(0);
    const [zindexSetter7, setZIndexSetter7] = useState(0);
    const [zindexSetter8, setZIndexSetter8] = useState(0);

    return (
        <>
            <div className="main-div-about-me-wrapper">
                <div className="line-up-img">
                    <img
                        id="about-me-img"
                        src={mainpic}
                        onClick={() => { setFirstOpacityChange(1) }}
                    />
                    <div className="gradient-left">
                        {/* <div className="light-about-me">
                            I'm still learning about me
                        </div> */}
                        <div
                            className="light-about-me"
                            style={{
                                opacity: `${opacityChange}`,
                                zIndex: `${zindexSetter}`
                            }}
                            onClick={() => { setOpacityChange(0); setNextSetOpacityChange(1); setZIndexSetter2(2) }}>
                            Moving to the States in my teens was a massive culture shock. Spending my formative years in Korea really shaped me and now more than ever I felt more like a puzzle piece of a different set.

                            <div class="Iam">

                                <p>dis
                                    <b>
                                        <div class="innerIam">
                                            connected<br />
                                            pleased<br />
                                            approved<br />
                                            jointed<br />
                                            asscoiated
                                        </div>
                                    </b>
                                </p>
                            </div>
                        </div>

                        <div
                            className="light-about-me-continue"
                            style={{
                                opacity: `${nextNextSetOpacityChange}`,
                                zIndex: `${zindexSetter3}`
                            }}
                            onClick={() => {
                                setNextNextSetOpacityChange(0);
                                setOpacityChange2(1);
                                setZIndexSetter4(4);
                            }}
                        >
                            Needless to say, I didn't come from much and looking back I'm glad that I didn't. Going through everything I had been through has taught me some valuable lessons. Some happy, some sad, all growing. I have my father to thank for indirectly putting a work ethic in me to do whatever I put my mind to and to do it well. Most importantly now I can live my life by some simple rules.

                        </div>


                        <div
                            className="light-about-me-continue2"
                            onClick={() => {
                                setOpacityChange3(0);
                                setOpacityChange4(1);
                                setZIndexSetter6(6);
                            }}
                            style={{
                                opacity: `${opacityChange3}`,
                                zIndex: `${zindexSetter5}`
                            }}>
                            <div id="wrapper">
                                <div id="container">

                                    <div className="dream">savor every moment</div>

                                </div>
                            </div>
                        </div>

                        <div className="light-about-me-continue3"
                            onClick={() => {
                                setOpacityChange5(0);
                                setOpacityChange6(1);
                                setZIndexSetter8(8)
                            }}
                            style={{
                                opacity: `${opacityChange5}`,
                                zIndex: `${zindexSetter7}`
                            }}>
                            <h1 class="jt --debug">
                                <span class="jt__row">
                                    <span class="jt__text">&LOVE DEEPLY</span>
                                </span>
                                <span class="jt__row jt__row--sibling" aria-hidden="true">
                                    <span class="jt__text">&LOVE DEEPLY</span>
                                </span>
                                <span class="jt__row jt__row--sibling" aria-hidden="true">
                                    <span class="jt__text">&LOVE DEEPLY</span>
                                </span>
                                <span class="jt__row jt__row--sibling" aria-hidden="true">
                                    <span class="jt__text">&LOVE DEEPLY</span>
                                </span>
                            </h1>
                        </div>
                    </div>








                    <div className="white-right">
                        <div className="dark-about-me"
                            onClick={() => {
                                setFirstOpacityChange(0);
                                setOpacityChange(1);
                                setZIndexSetter(1);
                            }}
                            style={{
                                opacity: `${firstOpacityChange}`
                            }}
                        >
                            As a German born, Korean raised, American–I've lived in a perpetual state of disconnect. My identity was always in question. Am I Korean? Am I Caucasian?

                            <div class="sign">
                                <span class="fast-flicker">cauc</span>as<span class="flicker">i</span>an
                            </div>


                            Fitting into social groups growing up always had a sort of stigma attached.
                        </div>


                        <div className="dark-about-me-continue"
                            onClick={() => {
                                setNextSetOpacityChange(0); setNextNextSetOpacityChange(1); setZIndexSetter3(3)
                            }}
                            style={{
                                opacity: `${nextSetOpacityChange}`,
                                zIndex: `${zindexSetter2}`
                            }}>
                            Life took some hard turns as it so often does. Without divulging too deeply, my father abandoned us, and left my mom, a now single mother that could barely speak English with no money to her name and two teenaged boys in a completely foreign country.
                        </div>


                        <div className="dark-about-me-continue2"
                            onClick={() => {
                                setOpacityChange2(0);
                                setOpacityChange3(1);
                                setZIndexSetter5(5)
                            }}
                            style={{
                                opacity: `${opacityChange2}`,
                                zIndex: `${zindexSetter4}`
                            }}>
                            <h1>Do</h1>
                            <h1>What</h1>
                            <h1>You</h1>
                            <h1>Love</h1>
                        </div>


                        <div className="dark-about-me-continue2"
                            onClick={() => {
                                setOpacityChange4(0);
                                setOpacityChange5(1);
                                setZIndexSetter7(7)
                            }}
                            style={{
                                opacity: `${opacityChange4}`,
                                zIndex: `${zindexSetter6}`
                            }}>

                            <div class="typing-wrapper">
                                <div class="typing-demo">
                                    {`while (happy) return healthy;`}
                                </div>
                            </div>
                        </div>


                        <div className="dark-about-me-continue3"
                            // onClick={() => {
                            //     setOpacityChange4(0);
                            //     setOpacityChange5(1);
                            //     setZIndexSetter7(7)
                            // }}
                            style={{
                                opacity: `${opacityChange6}`,
                                zIndex: `${zindexSetter8}`
                            }}>
                                <a href="https://github.com/garydsong" target="_blank">
                                <img id="aboutme-icons-a" src={giticon}/>
                                </a>

                                <a href="https://www.linkedin.com/in/gary-song-96b071246/" target="_blank">
                                <img id="aboutme-icons-b" src={linkicon}/>
                                </a>

                                <a href="https://gary-song.com" target="_blank">
                                <img id="aboutme-icons-c" src={wwwicon}/>
                                </a>

                                <img
                                id="aboutme-icons2"
                                src={lateicon}
                                onClick={() => history.push('/')}
                                />

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AboutMe
