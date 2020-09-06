import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import PetsIcon from '@material-ui/icons/Pets';
import './map.css';
import { IconButton, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { PacmanLoader } from 'react-spinners';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const geolocationOptions = {
  enableHighAccuracy: true,
  maximumAge: 600000,
  timeout: 15000
};
const getCurrentPosition = (_) =>
  new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(
      resolve,
      reject,
      geolocationOptions
    )
  );

const Map = () => {
  const [viewport, setViewport] = useState(null);
  const [userLocations, setUserLocations] = useState([]);
  const [selectedSitter, setSelectedSitter] = useState(null);
  const [ownerLocation, setOwnerLocation] = useState([]);
  const [selectedOwner, setSelectedOwner] = useState(null);
  const { currentUser } = useContext(AppContext);

  const fetchUserLocation = () => {
    const sittersArr = [];
    const ownersArr = [];
    fetch('/users')
      .then((response) => response.json())
      .then((data) => {
        data.map((obj) => {
          if (!obj.owner) {
            sittersArr.push(obj);
          } else {
            ownersArr.push(obj);
          }
          return sittersArr && ownersArr;
        });
        setUserLocations(sittersArr);
        setOwnerLocation(ownersArr);
      });
  };

  const setCurrentUserLocation = () => {
    getCurrentPosition().then((pos) => {
      if (!pos) return;
      const { latitude, longitude } = pos.coords;
      setViewport({
        latitude,
        longitude,
        width: '100vw',
        height: '100vh',
        zoom: 10
      });
    });
  };

  useEffect(() => {
    fetchUserLocation();
    setCurrentUserLocation();
  }, []);

  if (!viewport)
    return (
      <div id="pacman">
        <PacmanLoader size={100} color={'rgb(53, 87, 167)'} />
      </div>
    );

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      mapStyle="mapbox://styles/juansito22/ckeasqfvl0lbd19ruf3i2d0bu"
      onViewportChange={(viewport) => {
        setViewport(viewport);
      }}
    >
      {currentUser?.owner
        ? userLocations.map((userLoc) => (
            <Marker
              key={userLoc._id}
              latitude={userLoc.latitude}
              longitude={userLoc.longitude}
            >
              <IconButton
                color="secondary"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedSitter(userLoc);
                }}
              >
                <PetsIcon />
              </IconButton>
            </Marker>
          ))
        : ownerLocation.map((userLoc) => (
            <Marker
              key={userLoc._id}
              latitude={userLoc.latitude}
              longitude={userLoc.longitude}
            >
              <IconButton
                color="secondary"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedOwner(userLoc);
                }}
              >
                <PetsIcon />
              </IconButton>
            </Marker>
          ))}

      {selectedSitter ? (
        <Popup
          latitude={selectedSitter.latitude}
          longitude={selectedSitter.longitude}
          closeButton
          closeOnClick={false}
          onClose={() => {
            setSelectedSitter(null);
          }}
        >
          <div>
            <img
              className="avatar-img"
              src={selectedSitter.avatar}
              alt="avatar"
            />
            <h2>{selectedSitter.name}</h2>
            <Link to={`/userprofile/${selectedSitter._id}`} target="_blank">
              Visit profile
            </Link>
          </div>
        </Popup>
      ) : null}

      {selectedOwner ? (
        <Popup
          latitude={selectedOwner.latitude}
          longitude={selectedOwner.longitude}
          closeButton
          closeOnClick={false}
          onClose={() => {
            setSelectedSitter(null);
          }}
        >
          <Typography
            component="div"
            variant="body1"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <img
              className="avatar-img"
              src={selectedOwner.avatar}
              alt="avatar"
            />
            <Typography variant="h6">{selectedOwner.name}</Typography>
            <Link to={`/userprofile/${selectedOwner._id}`} target="_blank">
              Visit profile
            </Link>
          </Typography>
        </Popup>
      ) : null}
    </ReactMapGL>
  );
};

export default Map;
