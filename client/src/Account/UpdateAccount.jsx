import React, {useContext, useState} from 'react';
import './account.css';
import '../colors.css';
import {TextField, Button} from '@material-ui/core';
import axios from 'axios';
import { AppContext } from '../Context/AppContext';
import user from '../Images/man.jpg';

const UpdateAccount = () => {
  const [formData, setFormData] = useState(null);
  const { currentUser, setCurrentUser } = useContext(AppContext);

  const checkPasswords = () => {
    if (formData.password && !formData.confirmPassword) {
     return alert('You must type the password confirmation!');
    }
    if (!formData.password && formData.confirmPassword) {
     return alert('You must type the password and the confirm password to change password!')
    }
    if (formData.password !== formData.confirmPassword) {
     return alert('Passwords must match!');
    }
    if (formData.password.length < 6) {
      return alert('Password must be longer than 6 characters!')
    }
    if (formData.password.toLowerCase().includes("password")) {
      return alert('Password cannot contain the word password')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData && formData.password) {
      return checkPasswords();
    }
    axios
    .put('/user/me', formData)
    .then((response) => {
      setCurrentUser(response.data);
      alert('Successfully updated account')
    })
    .catch((error) => {
      console.log(error);
      alert("Something went wrong...")
    });
  }

    return (
        <form className="tab-content" onSubmit={handleSubmit}>
        <div className="tab-grid">
            <div 
              // style={{
              //   backgroundImage: `url('${preview ? preview : currentUser?.avatar ? currentUser.avatar : user}')`,
              //   backgroundSize: "cover",
              //   backgroundPosition: "center"}}
              className="avatar-preview profile-image">
            </div>
            <label htmlFor="avatar">Choose a profile picture:</label>
            {/* <input onChange={handleChange} type="file" id="avatar" name="avatar" accept="image/*"  style={{marginBottom: "30px"}}/> */}
        </div>
        <div className="tab-grid" key={currentUser?.name}>
            <TextField
              onChange={((e) => setFormData({ ...formData, [e.target.name]: e.target.value }))}
              defaultValue={currentUser?.name}
              className="tab-input"
              variant="outlined"
              id="name"
              label="name"
              type="text"
              name="name"
            />
            <TextField
              onChange={((e) => setFormData({ ...formData, [e.target.name]: e.target.value }))}
              defaultValue={currentUser?.email}
              className="tab-input"
              variant="outlined"
              id="email"
              label="email"
              type="email"
              name="email"
            />
            <TextField
              onChange={((e) => setFormData({ ...formData, [e.target.name]: e.target.value }))}
              className="tab-input"
              variant="outlined"
              id="password"
              label="password"
              type="password"
              name="password"
            />
            <TextField
              onChange={((e) => setFormData({ ...formData, [e.target.name]: e.target.value }))}
              className="tab-input"
              variant="outlined"
              id="confirm-password"
              label="confirm password"
              type="password"
              name="confirmPassword"
            />
            </div>
        <div className="tab-grid" key={currentUser?._id}>
            <TextField
              onChange={((e) => setFormData({ ...formData, [e.target.name]: e.target.value }))}
              defaultValue={currentUser?.description}
              className="tab-input"
              variant="outlined"
              id="description"
              label="description"
              type="text"
              name="description"
              multiline
              rows="12"
            />
          </div>
        <div className="tab-grid">
            <Button type="submit" className="header-card-btn" style={{width: "100%", height: "50px"}}>
              Submit Changes
            </Button>
        </div>     
        </form>
    )
}

export default UpdateAccount
