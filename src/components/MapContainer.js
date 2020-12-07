import React from 'react';
import Media from 'react-media';
import { Map, Marker } from 'google-maps-react';

function MapContainer (props) {

	return (
		<Media queries={{
			small: "(max-width: 599px)",
			medium: "(min-width: 600px) and (max-width: 1199px)",
			large: "(min-width: 1200px)"
		}}>
			{matches => (
				<React.Fragment>
					{matches.small &&
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
							disableDefaultUI="true"
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
					}
					{(matches.medium || matches.large) &&
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
					}
				</React.Fragment>
			)}
		</Media>
	);
}

export default MapContainer;