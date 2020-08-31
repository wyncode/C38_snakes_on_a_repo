import React from 'react';
import './profiles.css';
import '../../colors.css';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

const ProfileButton = ({ role, ownerID }) => {
  const history = useHistory();
  const leftButtonText = () => {
    switch (role) {
      case 'owner':
        return 'Video Call';
      case 'sitter':
        return 'Tip Me!';
      default:
        return 'Share';
    }
  };

  return (
    <div id="profile-btn-wrapper">
      <Button variant="contained" id="btn1">
        {leftButtonText()}
      </Button>
      {ownerID ? (
        <Button
          onClick={() => history.push(`/userprofile/${ownerID}`)}
          variant="contained"
          id="btn2"
        >
          Owner
        </Button>
      ) : (
        <Button variant="contained" id="btn2">
          Chat
        </Button>
      )}
    </div>
  );
};

export default ProfileButton;
