import React from 'react';
import './landing.css';
import '../index.css';
import Typography from '@material-ui/core/Typography';

const AboutTheSite = () => {
  return (
    // Must wrap component in fragment
    // so that CSS selectors target elements correctly
    <>
      <div id="lb-title">
        <Typography variant="h3" component="div">
          <b>Petster Exotic:</b>
          <Typography variant="h6">
            a site built for exotic pet owners and sitters!
          </Typography>
        </Typography>
      </div>
      <div id="lb-info">
        <Typography variant="body1" component="div">
          <p>
            Do you own an exotic animal, and wish it was easier to find a pet
            sitter, and provide detailed care instructions?
          </p>
          <p>
            Or are you a pet sitter interested in looking after more unusual
            animals and don't know who to offer your services to?
          </p>
          <p>Look no further than Petster Exotic!</p>
        </Typography>
      </div>
      <div id="lb-one">
        <Typography variant="body1" component="div">
          With Petster Exotic, you can:
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
      <div id="lb-two">
        <Typography variant="h5" component="h5">
          Sign Up Now! or Login
        </Typography>
      </div>
    </>
  );
};

export default AboutTheSite;
