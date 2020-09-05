import React from 'react';
import { Button, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const TitleContainer = () => {
  const history = useHistory();
  return (
    <div id="landing-title-container">
      <Typography className="lt-title" gutterBottom variant="h1" component="h1">
        Petster Exotic
      </Typography>
      <Typography
        className="lt-subtitle"
        gutterBottom
        variant="h4"
        component="h4"
      >
        a place for exotic pet owners and pet sitters to connect online!
      </Typography>

      <Button
        onClick={() => {
          history.push('/search');
        }}
        className="home-btn"
        variant="contained"
      >
        Search!
      </Button>
      <Button
        className="home-btn"
        variant="contained"
        style={{ margin: '0 auto' }}
        onClick={() => {
          history.push('/login');
        }}
      >
        Login
      </Button>
    </div>
  );
};

export default TitleContainer;
