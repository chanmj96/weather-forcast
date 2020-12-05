import React from 'react';
import LocationSearchInput from './components/LocationSearchInput';
import MapContainer from './components/MapContainer';
import WeatherContainer from './components/WeatherContainer';

const locationDefault = {
  lat: 37.4220656,
  lng: -122.0840897
};

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
      errorMsg: '',
      showMarker: false,
      shouldUseCurrentLocation: true
    };

    this.weatherContainerRef = React.createRef();
  }

  getLatitude() {
    return this.state.shouldUseCurrentLocation ? (this.state.currentLat !== 0 ? this.state.currentLat : locationDefault.lat) : this.state.location.lat;
  }

  getLongitude() {
    return this.state.shouldUseCurrentLocation ? (this.state.currentLng !== 0 ? this.state.currentLng : locationDefault.lng) : this.state.location.lng;
  }

  handleLocationError(browserHasGeolocation) {
    this.setState({ errorMsg:
        browserHasGeolocation
          ? "Error: The Geolocation service failed."
          : "Error: Your browser doesn't support geolocation.",
        currentLat: locationDefault.lat,
        currentLng: locationDefault.lng,
    });

    this.updateLocation(locationDefault.lat, locationDefault.lng);
  }

  onClearLocationClicked() {
    this.updateAddress('');

    this.weatherContainerRef.current.clearLocationForecast();
  }

  onCurrentLocationClicked() {
    if (this.state.currentLat === 0 && this.state.currentLng === 0) {

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          let currentLat = position.coords.latitude;
          let currentLng = position.coords.longitude;

          this.setState({
            address: 'Latitude: ' + currentLat.toFixed(5) + ', Longitude: ' + currentLng.toFixed(5),
            currentLat: currentLat,
            currentLng: currentLng,
            showMarker: true,
            shouldUseCurrentLocation: true
          });

          this.updateLocation(currentLat, currentLng);
        },
        () => this.handleLocationError(true));
      }
      else { this.handleLocationError(false); }
    }
    else {
      this.setState({
        address: 'Latitude: ' + this.state.currentLat.toFixed(5) + ', Longitude: ' + this.state.currentLng.toFixed(5),
        shouldUseCurrentLocation: true
      });

      this.updateLocation(this.state.currentLat, this.state.currentLng);
    }
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

    this.updateLocation(latLng.lat, latLng.lng);
  }

  updateAddress(address) {
    this.setState({
      address: address,
      errorMsg: ''
    });
  }

  updateLocation(lat, lng) {
    this.weatherContainerRef.current.updateLocationForecast(lat, lng);
  }

  render() {
    return (
      <div className="weather-app">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-sm-8 col-12">
              <div className="location-form-container">
                <h2 className="title">Weather Forecast</h2>

                <div className="btn-container">
                  <button className="btn clear-location-button" onClick={() => this.onClearLocationClicked()}>
                    Clear
                  </button>

                  <button className="btn current-location-button" onClick={() => this.onCurrentLocationClicked()}>
                    <span>Current Location</span>
                  </button>
                </div>

                <LocationSearchInput
                  address={this.state.address}
                  onLocationSelected={(latLng) => this.onLocationSelected(latLng)}
                  updateAddress={(address) => this.updateAddress(address)}
                />
                {this.state.errorMsg !== '' ?
                  <div className="error-message">{this.state.errorMsg}</div> : ''
                }
                <div className="help-text">Enter an address to see the 7 day forcast at its location.</div>
              </div>
            </div>

            <div className="col-xl-6 col-sm-8 col-12">
              <div className="map-container">
                <MapContainer
                  address={this.state.address}
                  location={this.state.location}
                  locationDefault={locationDefault}
                  mapLatitude={this.getLatitude()}
                  mapLongitude={this.getLongitude()}
                  showMarker={this.state.showMarker}
                  shouldUseCurrentLocation={this.state.shouldUseCurrentLocation}
                  zoomLevel={14}
                />
              </div>
            </div>

            <div className="col-xl-12 col-sm-4 col-12">
              <WeatherContainer
                lat={this.getLatitude()}
                lng={this.getLongitude()}
                ref={this.weatherContainerRef}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
