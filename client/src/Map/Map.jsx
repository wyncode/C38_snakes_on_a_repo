import React, { useState, useEffect } from 'react';
import ReactMapGL from 'react-map-gl';

const geolocationOptions = {
	enableHighAccuracy: true,
	maximumAge: 600000,
	timeout: 15000
};
const getCurrentPosition = (_) =>
	new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject, geolocationOptions));

const Map = () => {
	const [ viewport, setViewport ] = useState(null);
	useEffect(() => {
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
		/>
	);
};
export default Map;
