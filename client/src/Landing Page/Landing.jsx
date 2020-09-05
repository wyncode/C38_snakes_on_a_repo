import React from 'react';
import './landing.css';
import '../index.css';
import AboutTheSite from './AboutTheSite';
import TitleContainer from './TitleContainer';
import AboutUs from './AboutUs';

const Landing = () => {
  return (
    <div id="home-container">
      <div id="top-container">
        <TitleContainer />
      </div>
      <div className="arrow-container">
        <div className="arrow down"></div>
      </div>
      <div id="landing-mid">
        <AboutTheSite />
      </div>
      <div id="landing-bottom">
        <AboutUs />
      </div>
    </div>
  );
};

export default Landing;
