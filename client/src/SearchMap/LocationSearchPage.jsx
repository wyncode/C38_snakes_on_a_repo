import React from 'react';
import '../colors.css';
import { Typography, Card, CardContent } from '@material-ui/core';
import Map from '../Map/Map';

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
      
			<Card style={{ marginTop: '100px' }} elevation={3} className="gradient-border">
				<CardContent style={{ width: '1400px', height: '800px' }} className="card-inside">
					<Map />
				</CardContent>
			</Card>
		</div>
	);

};

export default LocationSearchPage;
