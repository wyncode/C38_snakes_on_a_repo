import React, { useState } from 'react';
import './login.css';
import { Link } from 'react-router-dom';
import {
  Typography,
  TextField,
  Button,
  Card,
  CardContent
} from '@material-ui/core';
import axios from 'axios';

const ForgetPassword = ({ history }) => {
  const [formData, setFormData] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    axios
      .get(`/password?email=${formData}`)
      .then((res) => {
        form.reset();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div id="login-container">
      <Card elevation={3} className="gradient-border">
        <CardContent className="card-inside">
          <Typography variant="h2" className="header-card-title">
            Forgot Password
          </Typography>
          <form onSubmit={handleSubmit} autoComplete="off">
            <TextField
              onChange={(e) => setFormData(e.target.value)}
              className="text-field"
              variant="outlined"
              label="email"
              type="email"
              name="email"
            />
            <Typography variant="button">
              <Link to="#">Forgot password?</Link>
              <br />
              <Link to="/register">Register?</Link>
            </Typography>
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
              Reset Password
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgetPassword;
