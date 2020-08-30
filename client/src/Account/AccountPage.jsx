import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Card, CardContent } from '@material-ui/core';
import { AppContext } from '../context/AppContext';
import Logout from '../Login/Logout';
import TabPane from './TabPane';
import './account.css';

const AccountPage = () => {
  const { currentUser } = useContext(AppContext);

  return (
    <div id="acct-container">
      <Card className="gradient-border" elevation={3}>
        <CardContent className="card-inside" style={{ padding: '20px' }}>
          <Typography variant="h3" gutterBottom>
            {`Welcome, ${currentUser && currentUser.name}!`}
          </Typography>
          <Typography variant="h5" gutterBottom id="account-header-subtitle">
            Manage your account information here.
          </Typography>
          <Typography variant="button" id="account-header-links">
            <Link to={`/userprofile/${currentUser && currentUser._id}`}>
              View Your Profile
            </Link>
            <Logout styleType={{ fontWeight: 'bold', padding: '0' }} />
          </Typography>
        </CardContent>
      </Card>

      <TabPane />
    </div>
  );
};

export default AccountPage;
