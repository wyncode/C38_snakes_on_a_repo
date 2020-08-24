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
        <Typography variant="h3" component="h3">
          The best website ever to do all your stuff and all your things.
        </Typography>
      </div>
      <div id="lb-info">
        <Typography variant="h5" component="h5">
          This is some information about us.
        </Typography>
      </div>
      <div id="lb-one">
        <Typography variant="h5" component="h5">
          This is some information about us.
        </Typography>
      </div>
      <div id="lb-two">
        <Typography variant="h5" component="h5">
          This is some information about us.
        </Typography>
      </div>
    </>
  );
};

export default AboutTheSite;
