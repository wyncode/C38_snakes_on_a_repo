import React from 'react';
import './profiles.css';
import '../../colors.css';
import Card from '@material-ui/core/Card';

const ProfileImg = ({ imgURL }) => {
  return (
    <Card
      elevation="3"
      id="profile-image"
      style={{
        backgroundImage: `url('${imgURL}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    ></Card>
  );
};

export default ProfileImg;
