import React from 'react';
import './profiles.css';
import '../../colors.css';
import { Typography, Card, CardContent } from '@material-ui/core/';
import FavoriteIcon from '@material-ui/icons/Favorite';

const ProfileName = (props) => {
  const toggleFav = (e) => {
    // send request to toggle favorites endpoint
    // using the id from params
    let heart = e.target.style;
    if (heart.color === 'red') {
      heart.color = 'black';
    } else {
      heart.color = 'red';
    }
  };

  return (
    <Card className="gradient-border" id="profile-name" elevation={3}>
      <FavoriteIcon
        boxShadow={3}
        className="heart"
        style={{ cursor: 'pointer', transform: 'scale(1.5,1.5)' }}
        onClick={toggleFav}
      />
      <CardContent className="card-inside">
        <Typography
          gutterBottom
          className="name-title"
          variant="h5"
          component="h5"
        >
          {props.name}
        </Typography>
        <Typography className="role-title" variant="h6" component="h6">
          {props.role}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProfileName;
