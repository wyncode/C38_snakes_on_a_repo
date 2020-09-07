import React from 'react';
import './landing.css';
import '../index.css';
import { Typography, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import ferret from '../Images/ferret.png';

const AboutTheSite = () => {
  const history = useHistory();
  return (
    // Must wrap component in fragment
    // so that CSS selectors target elements correctly
    <>
      <div id="about-site-title">
        <Typography id="inner-title" variant="h3" component="div">
          <b className="aboutus-title">Petster Exotic:</b>
          <Typography variant="h6">
            a site built for exotic pet owners and sitters!
          </Typography>
        </Typography>
      </div>
      <div id="about-site-info">
        <Typography variant="h6" component="div">
          <p>
            Own an exotic animal? Wish it was easier to find a pet sitter, or to
            provide detailed care instructions?
          </p>
          <p>
            Or are you a pet sitter interested in looking after more unusual
            animals and don't know who to offer your services to?
          </p>
          <p>
            Look no further than <b>Petster Exotic!</b>
          </p>
        </Typography>
      </div>
      <div id="about-site-list">
        <Typography variant="h6" component="div">
          <span className="aboutus-title" style={{ fontWeight: 'bold' }}>
            With Petster Exotic, you can:
          </span>
          <ul>
            <li>Contact fellow users by email or video chat</li>
            <li>
              Search for pet owners and pet sitters by location or information
            </li>
            <li>Save your favorite user and pet profiles for easy reference</li>
            <li>Save detailed care instructions for your animals</li>
            <li>Use PayPal to pay your pet sitter for their services</li>
            <li>Save your availability and appointments on a calendar</li>
          </ul>
        </Typography>
      </div>
      <div id="about-site-signup">
        <div id="about-site-signup-upper">
          <Typography
            style={{ fontWeight: 'bold' }}
            variant="h4"
            className="aboutus-title"
            component="h5"
          >
            Register with us now!
            <hr />
          </Typography>
        </div>
        <div id="about-site-signup-lower">
          <img src={ferret} alt="ferret" />
          <div id="landing-about-site-btns">
            <Button
              onClick={() => {
                history.push('/register');
              }}
              variant="contained"
            >
              Sign Up
            </Button>
            <Button
              variant="contained"
              style={{ margin: '0 auto' }}
              onClick={() => {
                history.push('/login');
              }}
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutTheSite;
