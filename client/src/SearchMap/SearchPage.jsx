import React, {useState} from 'react';
import '../colors.css';
import './search.css';
import { Typography, Card, CardContent, Button, TextField, FormControlLabel, Radio, RadioGroup, FormControl, FormLabel} from '@material-ui/core';
import {Link} from 'react-router-dom';

const SearchPage = () => {
  const [results, setResults] = useState('');
  const [search, setSearch] = useState('');
  const [searchModel, setSearchModel] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchModel) {
      alert("Must select pets or users")
    }
    else if (!search) {
      alert("Must type a search term")
    }
    else {
      fetch(`/search/${searchModel}?query=${search}`)
    .then(res => res.json())
    .then(results => {
      setResults(results);
      console.log(results);
    })
  }
}

  return (
    <div className="searchmap-container">
      <Card elevation={3} className="gradient-border">
        <CardContent className="card-inside searchbox">
          <Typography variant="h2" className="header-card-title">Search</Typography>

          <form onSubmit={handleSubmit}>
            <FormControl component="fieldset" className="search-form-control">
              <FormLabel className="legend" component="legend" >Search Pets or Users</FormLabel>
                <RadioGroup aria-label="searchModel" name="searchModel" value={searchModel} onChange={(e) => setSearchModel(e.target.value)}>
                  <FormControlLabel value="pet" control={<Radio />} label="Pets" />
                  <FormControlLabel value="user" control={<Radio />} label="Users" />
                </RadioGroup>
            </FormControl>
            <FormControl component="fieldset" className="search-form-control">
              <FormLabel className="legend" component="legend" >Search By...</FormLabel>
                <TextField
                  variant="outlined"
                  placeholder="name/description..."
                  type="text"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </FormControl>
            <Button className="header-card-btn" type="submit">Search</Button>
          </form>
        </CardContent>
      </Card>

{results && 
      <Card elevation={3} className="gradient-border search-result-box">
        <CardContent className="card-inside">
          <Typography className="header-card-title" variant="h3">
            Results
          </Typography>
          <div className="results-flexbox">
          {results && results.map(el => {
            return (
              <Typography className="search-results" component="div" key={el._id}>  
                <Typography className="result-link" component={Link} to={`/${searchModel}profile/${el._id}`}>
                  ► {el.name}
                </Typography><br/>
                <Typography className="result-role" variant="button">
                  {el.type ? el.type : el.owner === true ? "Pet Owner" : "Pet Sitter"}
                </Typography> 
                <hr/>
                <p>
                  {el.description.slice(0,200)}
                  {el.description.length > 200 && "..."}
                </p>
              </Typography>
            );
          })}
          </div>
          
        </CardContent>
      </Card>
}
    </div>
  );
};

export default SearchPage;
