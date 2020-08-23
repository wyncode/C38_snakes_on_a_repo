import React from 'react';
import './landing.css';
import '../index.css';
import AboutTheSite from './AboutTheSite';
import TitleContainer from './TitleContainer';

const Landing = () => {
  return (
    <div id="home-container">
      <div id="top-container">
        <TitleContainer />
      </div>
      <div class="arrow-container">
        <div className="arrow down"></div>
      </div>
      <div id="landing-bottom">
        <AboutTheSite />
      </div>
    </div>
  );
};

export default Landing;
