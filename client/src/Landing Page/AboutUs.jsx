import React from 'react';
import './landing.css';
import { Typography, Box } from '@material-ui/core';
import fish from '../Images/fish3.png';
import snake from '../Images/snake4.png';
import bird from '../Images/parrot3.png';

const AboutUs = () => {
  return (
    <>
      <div id="about-heading">
        <Typography
          variant="h2"
          className="aboutus-title"
          style={{ fontWeight: '500' }}
        >
          About the Team
        </Typography>
        <Typography
          variant="h5"
          style={{
            display: 'block',
            textAlign: 'justify',
            marginTop: '30px',
            marginBottom: '50px'
          }}
        >
          🦎 We are a group of three
          <a href="https://wyncode.co/" target="_blank">
            &nbsp;Wyncode&nbsp;
          </a>
          students who wanted to use our final project to build a web app that
          offers exotic pet owners and sitters a convenient way to find,
          communicate and share information with each other online.
          <hr />
          Visit this app on{' '}
          <a
            href="https://github.com/wyncode/C38_snakes_on_a_repo"
            target="_blank"
          >
            GitHub
          </a>
          !
        </Typography>
      </div>
      <div id="cards">
        <div className="about-card">
          <img src={bird} />
          <div className="card-text">
            <Typography variant="h4">Erialbania</Typography>
            <Typography variant="body1" style={{ marginTop: '10px' }}>
              <hr />
              Full Stack Web Development student from Wyncode's Cohort 38.
              Former digital marketing coordinator looking to make a career
              change into the tech industry.
            </Typography>
            <Typography variant="body1" style={{ marginTop: '10px' }}>
              <a href="https://github.com/Erialbania" target="blank">
                GitHub
              </a>
              &nbsp;||&nbsp;
              <a
                href="https://www.linkedin.com/in/erialbanialopez/"
                target="_blank"
              >
                LinkedIn
              </a>
            </Typography>
          </div>
        </div>
        <div className="about-card">
          <img src={fish} style={{ transform: 'scaleX(-1) rotate(-10deg)' }} />
          <div className="card-text">
            <Typography variant="h4">Juan</Typography>
            <Typography variant="body1" style={{ marginTop: '10px' }}>
              <hr /> Full Stack Web Development student from Wyncode's Cohort
              38.
            </Typography>
            <Typography variant="body1" style={{ marginTop: '10px' }}>
              <a href="https://github.com/juanjpayan" target="blank">
                GitHub
              </a>
              &nbsp;||&nbsp;
              <a href="#" target="_blank">
                LinkedIn
              </a>
            </Typography>
          </div>
        </div>
        <div className="about-card">
          <img src={snake} style={{ width: '180px' }} />
          <div className="card-text">
            <Typography variant="h4">Liz</Typography>
            <Typography variant="body1" style={{ marginTop: '10px' }}>
              <hr />
              Full Stack Web Development student from Wyncode's Cohort 38.
              Currently enjoying the journey of transitioning my career from
              retail management to web developer!
            </Typography>
            <Typography variant="body1" style={{ marginTop: '10px' }}>
              <a href="https://github.com/e-a-w" target="blank">
                GitHub
              </a>
              &nbsp;||&nbsp;
              <a href="https://www.linkedin.com/in/eawatkins/" target="_blank">
                LinkedIn
              </a>
            </Typography>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
