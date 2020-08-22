import React from "react";
import { Button, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const TitleContainer = () => {
  const history = useHistory();
  return (
    <div id="landing-title-container">
      <Typography className="lt-title" gutterBottom variant="h1" component="h1">
        Site Name
      </Typography>
      <Typography
        className="lt-subtitle"
        gutterBottom
        variant="h4"
        component="h4"
      >
        welcome to the #1 site for stuff and things!
      </Typography>

      <Button
        onClick={() => {
          history.push("/search");
        }}
        className="home-btn"
        variant="contained"
      >
        Search!
      </Button>
      <Button
        className="home-btn"
        variant="contained"
        onClick={() => {
          history.push("/login");
        }}
      >
        Login
      </Button>
    </div>
  );
};

export default TitleContainer;
