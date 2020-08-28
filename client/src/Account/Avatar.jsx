import React, { useState, useContext } from 'react';
import './account.css';
import '../colors.css';
import defaultAvatar from '../Images/man.jpg';
import { AppContext } from '../Context/AppContext';
import axios from 'axios';
import { Button } from '@material-ui/core';

const Avatar = () => {
  const { currentUser, setCurrentUser } = useContext(AppContext);
  const [preview, setPreview] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setPreview(URL.createObjectURL(event.target.files[0]));
    setImage(event.target.files[0]);
  };

  const handleImage = (event) => {
    event.preventDefault();
    setLoading(true);
    const avatar = new FormData();
    avatar.append('avatar', image, image.name);
    axios
      .post('/user/avatar', avatar, { withCredentials: true })
      .then((response) => {
        setCurrentUser({ ...currentUser, avatar: response.data.secure_url });
        setLoading(false);
      })
      .catch((error) => console.log(error));
      alert('Your avatar was updated successfully!');
  };

  return (
    <form
      onSubmit={handleImage}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <div
        style={{
          backgroundImage: `url('${
            preview
              ? preview
              : currentUser?.avatar
              ? currentUser.avatar
              : defaultAvatar
          }')`
        }}
        className="avatar-preview profile-image"
      ></div>
      <label htmlFor="avatar">Upload a profile picture:</label>
      <input
        onChange={handleChange}
        type="file"
        id="avatar"
        name="avatar"
        accept="image/*"
        style={{marginLeft: '60px' }}
      />
      <Button type="submit" className="header-card-btn" style={{marginBottom: '30px'}}>
        Upload Avatar
      </Button>
    </form>
  );
};

export default Avatar;
