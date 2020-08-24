import React from 'react';
import '../colors.css';
import './searchmap.css';
import { Typography, Card, CardContent, TextField } from '@material-ui/core';

const SearchPage = () => {
  return (
    <div className="searchmap-container">
      <Card elevation={3} className="gradient-border search-title">
        <CardContent className="card-inside">
          <Typography variant="h2">Search</Typography>
          <TextField
            className="searchbar"
            variant="outlined"
            placeholder="search..."
            type="text"
          />
        </CardContent>
      </Card>
      <Card elevation={3} className="gradient-border search-results">
        <CardContent className="card-inside">
          <Typography variant="h4">Results</Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default SearchPage;
