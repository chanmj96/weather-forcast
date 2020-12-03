import React from 'react';
import { Map } from 'google-maps-react';

const mapStyles = {
	width: '50rem',
	height: '30rem'
};

class MapContainer extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			currentLat: 0,
			currentLng: 0,
			shouldUseCurrentLocation: true
		}
	}


	componentDidMount() {
		this.getCurrentCoords();
	}

	getCurrentCoords() {
		navigator.geolocation.getCurrentPosition((position) => {
			this.state = {
				currentLat: position.coords.latitude,
				currentLng: position.coords.longitude
			};
		});
	}

	getLatitude() {
		return this.state.shouldUseCurrentLocation ? this.state.currentLat : this.props.location.lat;
	}

	getLongitude() {
		return this.state.shouldUseCurrentLocation ? this.state.currentLng : this.props.location.lng;
	}

	render() {
		return (
			<Map
				google={window.google}
				zoom={14}
				style={mapStyles}
				center={
					{
						lat: this.getLatitude(),
						lng: this.getLongitude()
					}
				}
			/>
		);
	}
}

export default MapContainer;