import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import PetsIcon from '@material-ui/icons/Pets';
import './Map.css';
import { IconButton } from '@material-ui/core';

const geolocationOptions = {
	enableHighAccuracy: true,
	maximumAge: 600000,
	timeout: 15000
};
const getCurrentPosition = (_) =>
	new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject, geolocationOptions));

const Map = () => {
	const [ viewport, setViewport ] = useState(null);
	const [ userLocations, setUserLocations ] = useState([]);

	const fetchUserLocation = () => {
		fetch('/users').then((response) => response.json()).then((data) => {
			setUserLocations(data);
		});
	};

	const setCurrentUserLocation = () => {
		getCurrentPosition().then((pos) => {
			if (!pos) return;
			const { latitude, longitude } = pos.coords;
			setViewport({
				latitude,
				longitude,
				width: '50vw',
				height: '50vh',
				zoom: 15
			});
		});
	};

	useEffect(() => {
		fetchUserLocation();
		setCurrentUserLocation();
	}, []);

	if (!viewport) return null;

	return (
		<ReactMapGL
			{...viewport}
			mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
			mapStyle="mapbox://styles/juansito22/ckeasqfvl0lbd19ruf3i2d0bu"
			onViewportChange={(viewport) => {
				setViewport(viewport);
			}}
		>
			{userLocations.map((userLoc) => (
				<Marker key={userLoc._id} latitude={userLoc.latitude} longitude={userLoc.longitude}>
					<IconButton color="secondary">
						<PetsIcon />
					</IconButton>
				</Marker>
			))}
		</ReactMapGL>
	);
};
export default Map;
