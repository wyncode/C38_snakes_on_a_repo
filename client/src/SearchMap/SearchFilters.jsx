import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';

const SearchFilters = ({ searchModel, setResults, all }) => {
  const petTypes = [
    'reptile',
    'bird',
    'amphibian',
    'mammal',
    'fish',
    'insect/arachnid',
    'other'
  ];
  const userTypes = ['owner', ''];

  const filterResults = (query) => {
    return all?.filter((result) => {
      if (searchModel === 'pet') {
        return result.type === query;
      } else {
        return result.owner === query;
      }
    });
  };

  const updateResults = (query) => {
    const newResults = filterResults(query);
    setResults(newResults);
  };

  return (
    <div>
      {searchModel === 'pet'
        ? petTypes.map((filter) => (
            <Button key={filter} onClick={() => updateResults(filter)}>
              {filter}
            </Button>
          ))
        : userTypes.map((filter) => (
            <Button key={filter} onClick={() => updateResults(Boolean(filter))}>
              {filter ? 'owner' : 'sitter'}
            </Button>
          ))}
    </div>
  );
};

export default SearchFilters;
