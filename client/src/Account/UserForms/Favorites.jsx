import React, { useState, useEffect } from 'react';
import '../account.css';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';

const Favorites = () => {
  const [currentFavOwners, setCurrentFavOwners] = useState();
  const [currentFavSitters, setCurrentFavSitters] = useState();
  const [currentFavPets, setCurrentFavPets] = useState();

  const result = [
    {
      _id: 123,
      type: 'owner',
      name: 'name',
      description: 'asfjaskfh'
    },
    {
      _id: 1235,
      type: 'owner',
      name: 'name',
      description: 'asfjaskfh'
    }
  ];

  //   useEffect(() => {
  //     // get the current user's favUsers and favPets
  //    // would be useful to get one object with two arrays
  //   }, []);

  const cards = (array, role) => {
    return (
      <>
        <Typography variant="h5">Favorite {role}</Typography>
        <div className="fav-box">
          {array.map((result) => {
            return (
              <div className="fav-card" key={result._id}>
                <FavoriteIcon
                  className="heart"
                  style={{ cursor: 'pointer', transform: 'scale(1.2,1.2)' }}
                  onClick={toggleFav}
                />
                <hr />
                <Typography
                  component={Link}
                  to={`/${array}/${result?._id}`}
                  style={{ fontSize: '25px' }}
                >
                  ► {result?.name}
                </Typography>
                <br />
                <Typography variant="button">{result?.type}</Typography>
                <hr />
                <p>
                  {result?.description?.slice(0, 200)}
                  {result?.description?.length > 200 && '...'}
                </p>
              </div>
            );
          })}
        </div>
      </>
    );
  };

  const toggleFav = (e) => {
    // send request to toggle favorites endpoint
    let heart = e.target.style;
    if (heart.color === 'red') {
      heart.color = 'black';
    } else {
      heart.color = 'red';
    }
  };

  return (
    <div>
      {cards(result, 'Pet Sitters')}
      <hr />
      {cards(result, 'Pet Owners')}
      <hr />
      {cards(result, 'Pets')}
    </div>
  );
};

export default Favorites;
