import React, { useEffect, useRef, useState, useContext } from 'react';
import './profiles.css';
import '../../colors.css';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';
import { Typography, Card, CardContent, Popover } from '@material-ui/core/';
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';

const ProfileName = ({ id, role, name }) => {
  const { currentUser, user } = useContext(AppContext);
  const heart = useRef(null);
  const [popoverMessage, setPopoverMessage] = useState('');

  useEffect(() => {
    if (!currentUser || !user) {
      heart.current.style.color = 'gray';
    } else {
      axios
        .get('/user/me', { withCredentials: true })
        .then(({ data }) => {
          if (data.favPets.includes(id) || data.favUsers.includes(id)) {
            heart.current.style.color = 'red';
          } else {
            heart.current.style.color = 'gray';
          }
        })
        .catch((error) => console.log(error));
    }
  }, [id, currentUser, user]);

  const toggleFav = () => {
    if (!currentUser || !user) {
      return setPopoverMessage(
        'In order to set favorites, you must be logged in!'
      );
    }
    let profile = 'favPets';
    if (role === 'pet owner' || role === 'pet sitter') {
      profile = 'favUsers';
    }
    axios
      .put(`/user/me/favorites?id=${id}&profile=${profile}`, {
        withCredentials: true
      })
      .catch((error) => console.log(error));
    if (heart.current.style.color === 'red') {
      heart.current.style.color = 'gray';
      setPopoverMessage('Removed from favorites');
    } else {
      heart.current.style.color = 'red';
      setPopoverMessage('Added to favorites');
    }
  };

  // Materials UI Library to handle Popover
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    toggleFav();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const popID = open ? 'simple-popover' : undefined;

  return (
    <Card className="gradient-border" id="profile-name" elevation={3}>
      <FavoriteTwoToneIcon
        aria-describedby={popID}
        ref={heart}
        className="heart"
        style={{ cursor: 'pointer', transform: 'scale(1.5,1.5)' }}
        onClick={handleClick}
      />
      <Popover
        id={popID}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <Typography
          style={{ padding: '20px', border: '4px double rgb(53, 87, 167)' }}
          component="div"
          variant="button"
          elevation={3}
          className="popover"
        >
          {popoverMessage}
        </Typography>
      </Popover>
      <CardContent className="card-inside">
        <Typography
          gutterBottom
          className="name-title"
          variant="h5"
          component="h5"
        >
          {name}
        </Typography>
        <Typography className="role-title" variant="h6" component="h6">
          {role}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProfileName;
