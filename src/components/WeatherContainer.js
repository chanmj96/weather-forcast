import React from 'react';

class WeatherContainer extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			current: {},
			daily: []
		}
	}

	clearLocationForecast() {
		this.setState({
			current: {},
			daily: []
		})
	}

	getDayOfWeek(dt) {
		const unixTimestamp = dt;

		const milliseconds = unixTimestamp * 1000;

		const dateObject = new Date(milliseconds)

		return dateObject.toLocaleString("en-US", {weekday: "long"});
	}

	getWeatherCard(daily, i) {
		return (
			<div className="card weather-card">
				<div className="day-of-week">
					{i == 0 ? 'Today' : this.getDayOfWeek(daily.dt)}
				</div>

				<div className="day-temperature">
					<span className="temp-max">{daily.temp.max.toFixed(0)}</span> / <span className="temp-min">{daily.temp.min.toFixed(0)}</span>
				</div>

				<div className="weather-icon">
					<img src={`http://openweathermap.org/img/wn/${daily.weather[0].icon}@2x.png`} />
				</div>

				<div className="weather-description">{daily.weather[0].description}</div>
			</div>
		);
	}

	updateLocationForecast(lat, lng) {
		fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=minutely,hourly,alerts&units=imperial&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`)
			.then(response => response.json())
			.then((data) => {this.setState({ current: data.current, daily: data.daily })})
			.catch((error) => console.error('Error', error));
	}

	render() {
		return (
			<div className="weather-container">
				{this.state.daily.map((daily, i) => {
					return (
						<div key={i}>
							{this.getWeatherCard(daily, i)}
						</div>
					);
				})}
			</div>
		);
	}
}

export default WeatherContainer;