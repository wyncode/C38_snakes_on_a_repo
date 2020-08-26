import React from 'react';
import './login.css';
import { Link } from 'react-router-dom';
import {
  Typography,
  TextField,
  Button,
  Card,
  CardContent
} from '@material-ui/core';

const RegisterPage = () => {
  return (
    <div id="login-container">
      <Card elevation={3} className="gradient-border">
        <CardContent className="card-inside">
          <Typography variant="h2" className="header-card-title">
            Register
          </Typography>
          <form autoComplete="off">
            <TextField
              className="text-field"
              variant="outlined"
              id="name"
              label="name"
              name="name"
            />
            <TextField
              className="text-field"
              variant="outlined"
              id="email"
              label="email"
              type="email"
              name="email"
            />
            <TextField
              className="text-field"
              variant="outlined"
              id="password"
              label="password"
              type="password"
              name="password"
            />
            <Typography variant="button">
              <Link to="/login">Login?</Link>
            </Typography>
            <Button
              variant="contained"
              size="large"
              style={{
                alignSelf: 'center',
                marginTop: '30px'
              }}
              className="header-card-btn"
            >
              Register
            </Button>
            <Button
              variant="contained"
              size="large"
              style={{
                alignSelf: 'center',
                marginTop: '30px'
              }}
              className="header-card-btn"
            >
              <div className="google-logo"></div>
              Sign Up With Google
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
