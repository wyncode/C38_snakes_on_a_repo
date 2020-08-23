import React from 'react';
import { Typography, Card, CardContent } from '@material-ui/core';

const AccountPage = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <Card
        elevation={3}
        style={{ marginTop: '100px' }}
        className="gradient-border"
      >
        <CardContent className="card-inside">
          <Typography variant="h2">Account</Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountPage;
