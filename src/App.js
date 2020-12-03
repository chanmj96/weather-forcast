import React from 'react';
import LocationSearchInput from './components/LocationSearchInput';
import MapContainer from './components/MapContainer';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      location: {
        lat: 0,
        lng: 0
      },
      currentLat: 0,
      currentLng: 0,
      shouldUseCurrentLocation: true
    };
  }

  componentDidMount() {
    this.getCurrentCoords();
  }

  getCurrentCoords() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        currentLat: position.coords.latitude,
        currentLng: position.coords.longitude
      });
    });
  }

  getLatitude() {
    return this.state.shouldUseCurrentLocation ? this.state.currentLat : this.state.location.lat;
  }

  getLongitude() {
    return this.state.shouldUseCurrentLocation ? this.state.currentLng : this.state.location.lng;
  }

  onCurrentLocationClicked() {
    this.setState({
      shouldUseCurrentLocation: true
    });
  }

  onLocationSelected (latLng) {
    this.setState({
      location: {
        lat: latLng.lat,
        lng: latLng.lng,
      },
      shouldUseCurrentLocation: false
    });
  }

  render() {
    return (
      <div className="weather-app">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-sm-12">
              <h2 className="title">Weather App</h2>

              <button className="current-location-button" onClick={() => this.onCurrentLocationClicked()}>
                Current Location
              </button>

              <LocationSearchInput
                onLocationSelected={(latLng) => this.onLocationSelected(latLng)}
              />
            </div>

            <div className="col-lg-6 col-sm-12">
              <div className="map-container">
                <MapContainer
                  location={this.state.location}
                  mapLatitude={this.getLatitude()}
                  mapLongitude={this.getLongitude()}
                  shouldUseCurrentLocation={this.state.shouldUseCurrentLocation}
                  zoomLevel={14}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
