import React from 'react';
import LocationSearchInput from './components/LocationSearchInput';

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
    </div>
  );
}

export default App;
