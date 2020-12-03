import React from 'react';
import LocationSearchInput from './components/LocationSearchInput';
import MapContainer from './components/MapContainer';

function App() {
  return (
    <div className="weather-app">
      <h2 className="title">Weather App</h2>

      <button className="current-location-button">
        Current Location
      </button>

      <div className="location-search-input">
        <LocationSearchInput />
      </div>

      <div className="map-container">
        <MapContainer
          location={location}
          zoomLevel={14}
        />
      </div>
    </div>
  );
}

const location = {
  address: '1600 Amphitheatre Parkway, Mountain View, california.',
  lat: 37.42216,
  lng: -122.08427,
}

export default App;
