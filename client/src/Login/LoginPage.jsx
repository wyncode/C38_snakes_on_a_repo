import React, { useState, useContext } from 'react';
import './login.css';
import { Link } from 'react-router-dom';
import {
  Typography,
  TextField,
  Button,
  Card,
  CardContent
} from '@material-ui/core';
import { AppContext } from '../context/AppContext';
import axios from 'axios';

const LoginPage = ({history}) => {
  const [formData, setFormData] = useState(null);
  const { setCurrentUser, setCurrentPets } = useContext(AppContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios('/user/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      data: formData
    }).then(({data}) => {
        sessionStorage.setItem('user', data.data);
        setCurrentUser(data.data);
        setCurrentPets(data.data.ownedPets);
        if (data){
          history.push('/account');
        }      
    }).catch((error) => {
      console.log(error);
      alert("Problem logging in; check your email and password");
    });
  };


  return (
    <div id="login-container">
      <Card elevation={3} className="gradient-border">
        <CardContent className="card-inside">
          <Typography variant="h2" className="header-card-title">
            Login
          </Typography>
          <form onSubmit={handleSubmit} autoComplete="off">
            <TextField
              onChange={((e) => setFormData({ ...formData, [e.target.name]: e.target.value }))}
              className="text-field"
              variant="outlined"
              id="email"
              label="email"
              type="email"
              name="email"
            />
            <TextField
              onChange={((e) => setFormData({ ...formData, [e.target.name]: e.target.value }))}
              className="text-field"
              variant="outlined"
              id="password"
              label="password"
              type="password"
              name="password"
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
              Login
            </Button>
            <Button
              variant="contained"
              size="large"
              style={{
                alignSelf: 'center',
                marginTop: '30px',
                width: '70%'
              }}
              className="header-card-btn"
            >
              <div className="google-logo"></div>
              Sign In With Google
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
