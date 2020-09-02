import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import PetsIcon from '@material-ui/icons/Pets';
import './Map.css';
import { IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';

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
  const [isLoading, setLoading] = useState(true);
  const [viewport, setViewport] = useState(null);
  const [userLocations, setUserLocations] = useState([]);
  const [selectedSitter, setSelectedSitter] = useState(null);

  const fetchUserLocation = () => {
    const sittersArr = [];
    fetch('/users')
      .then((response) => response.json())
      .then((data) => {
        data.map((obj) => {
          if (!obj.owner) {
            sittersArr.push(obj);
          }
          return sittersArr;
        });
        setUserLocations(sittersArr);
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
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  if (!viewport) return null;

  return (
    <div>
      {isLoading ? (
        <div>
          <h1>LOADING</h1>
        </div>
      ) : (
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
          mapStyle="mapbox://styles/juansito22/ckeasqfvl0lbd19ruf3i2d0bu"
          onViewportChange={(viewport) => {
            setViewport(viewport);
          }}
        >
          {userLocations.map((userLoc) => (
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
          ))}

          {selectedSitter ? (
            <Popup
              latitude={selectedSitter.latitude}
              longitude={selectedSitter.longitude}
              closeButton={true}
              closeOnClick={false}
              onClose={() => {
                setSelectedSitter(null);
              }}
            >
              <div>
                <img src={selectedSitter.avatar} alt="avatar" />
                <h2>{selectedSitter.name}</h2>
                <Link to={`/userprofile/${selectedSitter._id}`} target="_blank">
                  Visit profile
                </Link>
              </div>
            </Popup>
          ) : null}
        </ReactMapGL>
      )}
    </div>
  );
};
export default Map;
