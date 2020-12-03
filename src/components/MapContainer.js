import React from 'react';
import { Map, Marker } from 'google-maps-react';

const mapStyles = {
	height: '30rem',
	width: '40rem'
};

function MapContainer (props) {

	return (
		<Map
			google={window.google}
			zoom={14}
			style={mapStyles}
			center={
				{
					lat: props.mapLatitude,
					lng: props.mapLongitude
				}
			}
		>
			{props.showMarker &&
				<Marker
					title={props.address}
					position={{lat: props.mapLatitude, lng: props.mapLongitude}}>
				</Marker>
			}
		</Map>
	);
}

export default MapContainer;