import React from 'react';
import LocationSearchInput from './components/LocationSearchInput';
import MapContainer from './components/MapContainer';
import WeatherContainer from './components/WeatherContainer';

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

    this.weatherContainerRef = React.createRef();
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

    this.weatherContainerRef.current.clearLocationForecast();
  }

  onCurrentLocationClicked() {
    this.setState({
      address: 'Latitude: ' + this.state.currentLat.toFixed(5) + ', Longitude: ' + this.state.currentLng.toFixed(5),
      showMarker: true,
      shouldUseCurrentLocation: true
    });

    this.weatherContainerRef.current.updateLocationForecast(this.state.currentLat, this.state.currentLng);
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

    this.weatherContainerRef.current.updateLocationForecast(latLng.lat, latLng.lng);
  }

  render() {
    return (
      <div className="weather-app">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-sm-8 col-12">
              <div className="location-form-container">
                <h2 className="title">Weather App</h2>

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
                  updateAddress={(address) => this.setState({address: address})}
                />
                <div className="help-text">Enter an address to see the 7 day forcast at its location.</div>
              </div>
            </div>

            <div className="col-xl-6 col-sm-8 col-12">
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
