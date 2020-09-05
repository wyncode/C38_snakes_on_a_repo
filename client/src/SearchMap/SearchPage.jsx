import React, { useState } from 'react';
import '../colors.css';
import './search.css';
import {
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import SearchFilters from './SearchFilters';
import swal from 'sweetalert';

const SearchPage = () => {
  const [results, setResults] = useState('');
  const [search, setSearch] = useState('');
  const [searchModel, setSearchModel] = useState('');
  const [all, setAll] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchModel) {
      swal('Oops!', 'Must select pets or users', 'error');
    } else if (!search) {
      swal('Oops!', 'Must type a search term', 'error');
    } else {
      fetch(`/search/${searchModel}?query=${search}`)
        .then((res) => res.json())
        .then((results) => {
          setResults(results);
          setAll(results);
        });
    }
  };

  return (
    <div className="searchmap-container">
      <Card elevation={3} className="gradient-border">
        <CardContent className="card-inside searchbox">
          <Typography variant="h2" className="header-card-title">
            Search
          </Typography>

          <form onSubmit={handleSubmit}>
            <FormControl component="fieldset" className="search-form-control">
              <FormLabel className="legend" component="legend">
                Search Pets or Users
              </FormLabel>
              <RadioGroup
                aria-label="searchModel"
                name="searchModel"
                value={searchModel}
                onChange={(e) => setSearchModel(e.target.value)}
              >
                <FormControlLabel
                  value="pet"
                  control={<Radio />}
                  label="Pets"
                />
                <FormControlLabel
                  value="user"
                  control={<Radio />}
                  label="Users"
                />
              </RadioGroup>
            </FormControl>
            <FormControl component="fieldset" className="search-form-control">
              <FormLabel className="legend" component="legend">
                Search By...
              </FormLabel>
              <TextField
                variant="outlined"
                placeholder="name/description..."
                type="text"
                onChange={(e) => setSearch(e.target.value)}
              />
            </FormControl>
            <Button className="header-card-btn" type="submit">
              Search
            </Button>
          </form>
        </CardContent>
      </Card>

      {results && (
        <Card elevation={3} className="gradient-border search-result-box">
          <CardContent className="card-inside">
            <Typography className="header-card-title" variant="h3">
              Results
            </Typography>
            <SearchFilters
              results={results}
              searchModel={searchModel}
              setResults={setResults}
              all={all}
            />
            <div className="results-flexbox">
              {results &&
                results.map((result) => {
                  return (
                    <Typography
                      className="search-results"
                      component="div"
                      key={result?._id}
                    >
                      <Typography
                        className="result-link"
                        component={Link}
                        to={`/${searchModel}profile/${result?._id}`}
                      >
                        ► {result?.name}
                      </Typography>
                      <br />
                      <Typography className="result-role" variant="button">
                        {result?.type
                          ? result?.type
                          : result?.owner
                          ? 'Pet Owner'
                          : 'Pet Sitter'}
                      </Typography>
                      <hr />
                      <p>
                        {result?.description?.slice(0, 200)}
                        {result?.description?.length > 200 && '...'}
                      </p>
                    </Typography>
                  );
                })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SearchPage;
