import React, { useState, useContext } from 'react';
import './account.css';
import '../colors.css';
import defaultAvatar from '../Images/defaultUser.png';
import defaultPetAvatar from '../Images/defaultPet.png';
import { AppContext } from '../Context/AppContext';
import axios from 'axios';
import { Button, Typography } from '@material-ui/core';

const Avatar = ({ role, petUpdate }) => {
  const { currentUser, setCurrentUser, setLoading } = useContext(AppContext);
  const [preview, setPreview] = useState(null);
  const [image, setImage] = useState(null);

  const handleChange = (event) => {
    setPreview(URL.createObjectURL(event.target.files[0]));
    setImage(event.target.files[0]);
  };

  const handleImage = () => {
    setLoading(true);
    const avatar = new FormData();
    avatar.append('avatar', image, image.name);
    axios
      .post(`/${role}/avatar/${petUpdate ? petUpdate.data._id : ''}`, avatar, {
        withCredentials: true
      })
      .then((response) => {
        setCurrentUser({ ...currentUser, avatar: response.data.secure_url });
        setPreview(null);
        setLoading(false);
      })
      .catch((error) => console.log(error));
    alert('Your avatar was updated successfully!');
  };

  return (
    <form
      onSubmit={handleImage}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifySelf: 'flex-start'
      }}
    >
      <Typography variant="h5" style={{ marginBottom: '10px' }}>
        Upload Avatar
      </Typography>
      {role === 'pets' ? (
        <div
          style={{
            backgroundImage: `url('${
              preview
                ? preview
                : petUpdate?.data.avatar
                ? petUpdate?.data.avatar
                : defaultPetAvatar
            }')`
          }}
          className="avatar-preview profile-image"
        ></div>
      ) : (
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
      )}
      <label htmlFor="avatar">Upload an avatar:</label>
      <input
        onChange={handleChange}
        type="file"
        id="avatar"
        name="avatar"
        accept="image/*"
        style={{ marginLeft: '60px' }}
      />
      <Button
        type="submit"
        className="header-card-btn"
        style={{ marginBottom: '30px' }}
      >
        Upload Avatar
      </Button>
    </form>
  );
};

export default Avatar;
