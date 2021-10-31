import React from 'react'
import Buttons from './Buttons'
import './HeroSection.css'
import '../App.css'


export const HeroSection = () => {
    
    return (
        <div className='hero-container'>
            {/* <video src={'videos/video-1.mp4'} autoPlay loop muted playsInline/> */}
            <h2>AVENTURE AWAITS</h2>
            <p>What are you waiting for?</p>
            <div className='hero-btns'>
                <Buttons
                    className='btns'
                    buttonStyle='btn--outline'
                    buttonSize='btn--large'
                    to='/Cards'   
                >
                    GET STARTED
                </Buttons>
                <Buttons
                    className='btns'
                    buttonStyle='btn--primaryz'
                    buttonSize='btn--large'
                    to='/'
                >
                    TRAILER <i className='far fa-play-circle'></i>
                </Buttons>
            </div>
        </div>
    )
};
