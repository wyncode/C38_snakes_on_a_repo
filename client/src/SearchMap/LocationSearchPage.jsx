import React from 'react';
import '../colors.css';
import { Typography, Card, CardContent } from '@material-ui/core';

const LocationSearchPage = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '100px'
      }}
    >
      <Card elevation={3} className="gradient-border">
        <CardContent className="card-inside">
          <Typography variant="h2">Map Search</Typography>
        </CardContent>
      </Card>

      <Card
        style={{ marginTop: '100px' }}
        elevation={3}
        className="gradient-border"
      >
        <CardContent className="card-inside">MAP</CardContent>
      </Card>
    </div>
  );
};

export default LocationSearchPage;
