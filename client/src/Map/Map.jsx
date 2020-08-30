import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import './Map.css';

const geolocationOptions = {
	enableHighAccuracy: true,
	maximumAge: 600000,
	timeout: 15000
};
const getCurrentPosition = (_) =>
	new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject, geolocationOptions));

const Map = () => {
	const [ userLocation, setUserLocation ] = useState({});

	let i;
	useEffect(() => {
		fetch('/users').then((response) => response.json()).then((data) => {
			for (i = 0; i < data.length; i++) {
				setUserLocation({
					latitude: data[i].latitude,
					longitude: data[i].longitude
				});
			}
		});
	}, []);
	console.log(userLocation[i].latitude);

	// fetch('/users')
	// 	.then((data) => {
	// 		return data.json();
	// 	})
	// 	.then((res) => {
	// 		console.log(res[0].longitude);
	// 		setUserLocation(res);
	// 	})
	// 	.catch((err) => {
	// 		console.log(err);
	// 	});

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
		>
			{/* <Marker key={userLocation._id} latitude={userLocation.latitude} longitude={userLocation.longitude}>
				<button className="icon">
					<img
						src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR5sr0J4F5ikQs_FbUcCwSLh4d9OnN5v5uSHg&usqp=CAU"
						alt="snake icon"
					/>
				</button>
			</Marker> */}
		</ReactMapGL>
	);
};
export default Map;
