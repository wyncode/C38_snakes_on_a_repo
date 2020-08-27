import React, {useState, useContext} from 'react';
import './login.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Typography,
  TextField,
  Button,
  Card,
  CardContent
} from '@material-ui/core';
import { AppContext } from '../Context/AppContext';

const RegisterPage = ({history}) => {
  const [formData, setFormData] = useState(null);
  const { setCurrentUser } = useContext(AppContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
    .post('/users/', formData)
    .then((response) => {
      console.log(response)
      sessionStorage.setItem('user', response.data);
      setCurrentUser(response.data);
      if (response.data) {
        history.push('/account');
      }
    })
    .catch((error) => {
      console.log(error);
      alert("Something went wrong... please make sure you are not using a duplicate email and are entering correct information.")
    });
  };

  return (
    <div id="login-container">
      <Card elevation={3} className="gradient-border">
        <CardContent className="card-inside">
          <Typography variant="h2" className="header-card-title">
            Register
          </Typography>
          <form onSubmit={handleSubmit} autoComplete="off">
            <TextField
            onChange={((e) => setFormData({ ...formData, [e.target.name]: e.target.value }))}
              className="text-field"
              variant="outlined"
              id="name"
              label="name"
              name="name"
            />
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
              <Link to="/login">Login?</Link>
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
              Register
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
              Sign Up With Google
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
