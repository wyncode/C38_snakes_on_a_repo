import React from 'react';
import { Link } from 'react-router-dom';
import './account.css';
import { Typography, Card, CardContent } from '@material-ui/core';

const AccountPage = () => {
  return (
    <div id="acct-container">
      <Card className="gradient-border" elevation={3}>
        <CardContent className="card-inside" style={{ padding: '20px' }}>
          <Typography variant="h3" gutterBottom>
            Welcome, Name!
          </Typography>
          <Typography variant="h5" gutterBottom id="account-header-subtitle">
            Manage your account information here.
          </Typography>
          <Typography variant="button" id="account-header-links">
            <Link to="/userprofile">View Your Profile</Link>
            <Link to="/">Logout</Link>
          </Typography>
        </CardContent>
      </Card>

      <Card className="gradient-border account-card" elevation={3}>
        <CardContent className="card-inside" style={{ padding: '20px' }}>
          <Typography variant="h4" gutterBottom>
            Form Will Go Here
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountPage;
