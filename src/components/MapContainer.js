import React from 'react';
import { Map } from 'google-maps-react';

const mapStyles = {
	height: '30rem',
	width: '40rem'
};

class MapContainer extends React.Component {

	render() {
		return (
			<Map
				google={window.google}
				zoom={14}
				style={mapStyles}
				center={
					{
						lat: this.props.mapLatitude,
						lng: this.props.mapLongitude
					}
				}
			/>
		);
	}
}

export default MapContainer;