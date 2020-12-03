import React from 'react';
import LocationSearchInput from './components/LocationSearchInput';
import MapContainer from './components/MapContainer';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      address: '',
      location: {
        lat: 0,
        lng: 0
      },
      currentLat: 0,
      currentLng: 0,
      showMarker: false,
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

  onClearLocationClicked() {
    this.setState({ address: '' });
  }

  onCurrentLocationClicked() {
    this.setState({
      address: 'LatLng: (' + this.state.currentLat.toFixed(5) + ', ' + this.state.currentLng.toFixed(5) + ')',
      showMarker: true,
      shouldUseCurrentLocation: true
    });
  }

  onLocationSelected(latLng) {
    this.setState({
      location: {
        lat: latLng.lat,
        lng: latLng.lng,
      },
      showMarker: true,
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

              <button className="btn clear-location-button" onClick={() => this.onClearLocationClicked()}>
                Clear
              </button>

              <button className="btn current-location-button" onClick={() => this.onCurrentLocationClicked()}>
                Current Location
              </button>

              <LocationSearchInput
                address={this.state.address}
                onLocationSelected={(latLng) => this.onLocationSelected(latLng)}
                updateAddress={(address) => this.setState({address: address})}
              />
            </div>

            <div className="col-lg-6 col-sm-12">
              <div className="map-container">
                <MapContainer
                  address={this.state.address}
                  location={this.state.location}
                  mapLatitude={this.getLatitude()}
                  mapLongitude={this.getLongitude()}
                  showMarker={this.state.showMarker}
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
