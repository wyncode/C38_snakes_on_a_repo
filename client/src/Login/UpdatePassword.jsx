import React, { useState } from 'react';
import './login.css';
import {
  Typography,
  TextField,
  Button,
  Card,
  CardContent
} from '@material-ui/core';
import axios from 'axios';

const UpdatePassword = ({ history }) => {
  const [password, setPassword] = useState(null);

  const handleChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.password !== password.confirmPassword) {
      throw Error('Error', 'Oops, passwords must match.');
    }
    try {
      await axios.put(
        '/password',
        { password: password.password },
        { withCredentials: true }
      );
      history.push('/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="login-container">
      <Card elevation={3} className="gradient-border">
        <CardContent className="card-inside">
          <Typography variant="h2" className="header-card-title">
            Update Password
          </Typography>
          <form onSubmit={handleSubmit} autoComplete="off">
            <TextField
              className="text-field"
              variant="outlined"
              label="password"
              type="password"
              name="password"
              onChange={handleChange}
              required
              autoComplete="off"
            />
            <TextField
              className="text-field"
              variant="outlined"
              label="confirm password"
              type="password"
              name="confirmPassword"
              onChange={handleChange}
              required
              autoComplete="off"
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              style={{
                alignSelf: 'center',
                marginTop: '30px',
                width: '70%'
              }}
              className="header-card-btn"
            >
              Update Password
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdatePassword;
