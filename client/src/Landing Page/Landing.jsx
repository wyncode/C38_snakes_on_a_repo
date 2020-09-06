import React from 'react';
import './landing.css';
import '../index.css';
import AboutTheSite from './AboutTheSite';
import TitleContainer from './TitleContainer';
import { ScrollTo } from 'react-scroll-to';

const Landing = () => {
  const height = window.innerHeight;

  return (
    <div id="home-container">
      <div id="top-container">
        <TitleContainer />
      </div>
      <div className="arrow-container">
        <ScrollTo>
          {({ scroll }) => (
            <div
              className="arrow down"
              onClick={() =>
                scroll({
                  y: height,
                  smooth: true
                })
              }
            ></div>
          )}
        </ScrollTo>
      </div>
      <div id="landing-mid">
        <AboutTheSite />
      </div>
    </div>
  );
};

export default Landing;
