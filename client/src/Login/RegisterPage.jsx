import React, { useState, useContext } from 'react';
import './login.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core';
import { AppContext } from '../context/AppContext';

const RegisterPage = ({ history }) => {
  const [formData, setFormData] = useState(null);
  const [accountType, setAccountType] = useState('select');
  const { setCurrentUser } = useContext(AppContext);

  const handleSelect = (e) => {
    setAccountType(e.target.value);
    setFormData({ ...formData, owner: Boolean(e.target.value) });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (accountType === 'select') {
      return alert('Please select an account type!');
    }
    axios
      .post('/users/', formData)
      .then((response) => {
        sessionStorage.setItem('user', response.data);
        setCurrentUser(response.data);
        if (response.data) {
          history.push('/account');
        }
      })
      .catch((error) => {
        console.log(error);
        alert(
          'Something went wrong... please make sure you are not using a duplicate email and are entering correct information.'
        );
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
            <FormControl variant="outlined">
              <InputLabel id="type">Account Type</InputLabel>
              <Select
                style={{ textAlign: 'left' }}
                value={accountType}
                name="owner"
                onChange={handleSelect}
                label="Account Type"
              >
                <MenuItem disabled value="select">
                  Select an Account Type
                </MenuItem>
                <MenuItem value="true">Pet Owner</MenuItem>
                <MenuItem value="">Pet Sitter</MenuItem>
              </Select>
            </FormControl>

            <Typography
              variant="body1"
              style={{
                textAlign: 'left',
                marginTop: '20px',
                marginBottom: '15px'
              }}
            >
              You have chosen to register as...
              <b>
                {accountType === 'true' ? 'a pet owner!' : 'a pet sitter!'}
              </b>
            </Typography>

            <TextField
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              className="text-field"
              variant="outlined"
              id="name"
              label="name"
              name="name"
            />
            <TextField
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              className="text-field"
              variant="outlined"
              id="email"
              label="email"
              type="email"
              name="email"
            />
            <TextField
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
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
