import React from 'react';
import { Map, Marker } from 'google-maps-react';

function MapContainer (props) {

	return (
		<Map
			google={window.google}
			zoom={14}
			className="map-display"
			center={
				{
					lat: props.mapLatitude,
					lng: props.mapLongitude
				}
			}
			initialCenter={
				{
					lat: props.locationDefault.lat,
					lng: props.locationDefault.lng
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