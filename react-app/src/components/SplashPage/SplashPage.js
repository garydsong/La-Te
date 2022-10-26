import React from "react";
import logo from "../../assets/la-te.png"
import './SplashPage.css'
import Collapsible from "../Collapsible/Collapsible";


function SplashPage() {
    return (
        <>
            <div className='starting-div'>
                <div className="whitespace"></div>
                <div className='top-splash-page-wrapper'>
                    <div className='top-splash-title'>Make Money and Make a La-Té</div>
                    <div className='top-splash-paragraph'>The all-in-one place to accept donations, memberships and sales from your fans!</div>
                </div>
                <div className="top-splash-input-signup">
                    <div className="la-te-url-grouper">
                        <div className="la-te-url-input">la-te.com/</div>
                        <input className="input-claim"></input>
                    </div>
                    <div className="claim-button-input">Claim</div>
                </div>

                <div className="top-splash-below-input">$6 million earned on Ko-fi last month!</div>

                <div className="whitespace"></div>
                <div className="whitespace"></div>
                <div className="whitespace"></div>


                <div className="under-top-splash-wrapper">
                    <div className="under-splash-title-container">
                        <div className="under-splash-title">We Take 0% of Your Donations</div>
                        <div className="under-splash-paragraph">
                            Unlike other platforms, we don't take a fee on each donation. Keep more of your money with La-Te.
                        </div>
                        <div className="under-splash-earned">
                            Over $150 Million earned so far!
                        </div>
                        <div className="under-splash-get-started">
                            Get Started
                        </div>
                    </div>
                </div>

                <div className="mid-splash-wrapper">
                    <img src='https://storage.ko-fi.com/cdn/landing_assets/kofi_second_heroimg.png' />
                </div>

                <div className="mid-under-splash-wrapper">
                    <div className="mid-under-splash-title">1,000,000 Creators Love Ko-fi</div>
                    <div className="mid-under-splash-paragraph">
                        <div className="mid-under-splash-buttons-1">Artists</div>
                        <div className="mid-under-splash-buttons-2">Cosplayers</div>
                        <div className="mid-under-splash-buttons-3">Musicians</div>
                        <div className="mid-under-splash-buttons-4">Podcasters</div>
                        <div className="mid-under-splash-buttons-5">Developers</div>
                        <div className="mid-under-splash-buttons-6">Streamers</div>
                        <div className="mid-under-splash-buttons-7">Video Creators</div>
                    </div>

                </div>

                <div className="testimonial-wrapper">

                </div>
                <div className="under-testimonial-wrapper">
                    <div className='top-splash-page-wrapper'>
                        <br></br>
                        <div className='top-splash-title'>Everything in One Place</div>
                        <div className='top-splash-paragraph'>Start accepting donations in just 60 seconds. Grow your income by opening your La-Te page.</div>
                    </div>
                    <div className="top-splash-input-signup">
                        <div className="la-te-url-grouper">
                            <div className="la-te-url-input">la-te.com/</div>
                            <input className="input-claim"></input>
                        </div>
                        <div className="claim-button-input">Claim</div>
                    </div>
                </div>

                <img className="top-splash-background-img" src="https://storage.ko-fi.com/cdn/landing_assets/kofi_heroimg.png" />
                <div className="bottom-about-la-te">
                    <Collapsible label="What is La-Té?">
                        <p>
                            La-Té is the easiest way for you to start making an income directly from your fans. You can accept donations, create membership tiers, open an online shop, and take commissions all with 0-5% platform fees.
                        </p>
                    </Collapsible>
                    <hr />
                    <Collapsible label="Who should use La-Té?">
                        <p>
                            Artists, Streamers, Podcasters, Writers, Crafters, Photographers, Filmmakers, Cosplayers and all kinds of creators use La-Té.
                        </p>
                    </Collapsible>
                    <hr />
                    <Collapsible label="How do I get paid?">
                        <p>
                            We do not currently have a functioning payout system. But when we do, we take 0% fees from donations and we don't hold onto your money. It goes directly from your supporter to you. Simple!
                        </p>
                    </Collapsible>
                    <hr />
                    <Collapsible label="How much does it cost?">
                        <p>
                            Nothing! La-Té is completely free.
                        </p>
                    </Collapsible>
                    <hr />
                    <Collapsible label="Do I have to buy a latte?">
                        <p>
                            Not at all! We do love lattes, but it's just a friendly metaphor. So many creators have told us it's just much nicer to ask fans to "buy a latte" than just "donate" to support your work. You can also change "latte" to something else, or switch to a traditional donation mode.
                        </p>
                    </Collapsible>
                    <hr />
                    <Collapsible label=" How much can I earn?">
                        <p>
                            Start making an income on La-Té regardless of how big your audience is. Thousands of creators make their first money on La-Té and some have earned more than $100k in donations alone!
                        </p>
                    </Collapsible>
                    <hr />
                    <Collapsible label="I'm not sure if I should use La-Té or Patreon? What's the difference?">
                        <p>
                            Creators tell us La-Té  is a simpler, lower pressure alternative to Patreon and you can also do so much more with La-Té. Take donations, crowdfund, sell products and offer commission requests all from one place.
                        </p>
                    </Collapsible>
                    <hr />
                    <Collapsible label=" What currencies do you offer?">
                        <p>
                            Lattes.
                        </p>
                    </Collapsible>
                    <hr />
                    <Collapsible label=" How can I get in touch with you?">
                        <p>
                            GitHub LinkedIn
                        </p>
                    </Collapsible>
                </div>
            </div>
        </>
    )
}

export default SplashPage
