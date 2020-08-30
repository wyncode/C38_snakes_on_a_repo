import React, { useContext, useState } from 'react';
import '../account.css';
import '../../colors.css';
import { TextField, Button } from '@material-ui/core';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';
import Avatar from '../Avatar';
import { useHistory } from 'react-router-dom';

const UpdateAccount = () => {
  const history = useHistory();
  const [formData, setFormData] = useState(null);
  const { currentUser, setCurrentUser, setLoading } = useContext(AppContext);

  const checkPasswords = () => {
    if (formData.password && !formData.confirmPassword) {
      return alert('You must type the password confirmation!');
    }
    if (!formData.password && formData.confirmPassword) {
      return alert(
        'You must type the password and the confirm password to change password!'
      );
    }
    if (formData.password !== formData.confirmPassword) {
      return alert('Passwords must match!');
    }
    if (formData.password.length < 6) {
      return alert('Password must be longer than 6 characters!');
    }
    if (formData.password.toLowerCase().includes('password')) {
      return alert('Password cannot contain the word password');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (formData?.password) {
      return checkPasswords();
    }
    axios
      .put('/user/me', formData)
      .then((response) => {
        setCurrentUser(response.data);
        alert('Successfully updated account');
      })
      .catch((error) => {
        console.log(error);
        alert('Something went wrong...');
      })
      .finally(() => setLoading(false));
  };

  const handleDelete = () => {
    window.confirm(
      'Warning: this action is permanent. Are you SURE you want to delete your account forever?'
    );
    axios
      .delete(`/user/me`)
      .then(() => {
        setCurrentUser(null);
        sessionStorage.removeItem('user');
        history.push('/login');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="user-tab-content">
      <div className="user-tab-grid">
        <Avatar role={'user'} />
      </div>
      <div className="user-tab-grid">
        {currentUser &&
          ['name', 'email', 'password', 'confirmPassword'].map((el) => {
            return (
              <TextField
                key={el}
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                defaultValue={
                  el === 'name'
                    ? currentUser?.name
                    : el === 'email'
                    ? currentUser?.email
                    : ''
                }
                className="tab-input"
                variant="outlined"
                id={el}
                label={el}
                type={
                  el === 'name' ? 'text' : el === 'email' ? 'email' : 'password'
                }
                name={el}
              />
            );
          })}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="user-tab-grid" key={currentUser?._id}>
          <TextField
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
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
        <div className="user-tab-grid">
          <Button
            type="submit"
            className="header-card-btn"
            style={{ width: '100%', height: '50px' }}
          >
            Submit Changes
          </Button>
          <Button
            onClick={handleDelete}
            className="header-card-btn"
            style={{ width: '100%', height: '50px', background: 'red' }}
          >
            Delete Account
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateAccount;
