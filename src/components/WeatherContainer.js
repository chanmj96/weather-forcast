import React from 'react';
import Media from 'react-media';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

class WeatherContainer extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			current: {},
			daily: [],
			fadeLeft: false,
			fadeRight: true
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
					{i === 0 ? 'Today' : this.getDayOfWeek(daily.dt)}
				</div>

				<div className="day-temperature">
					<span className="temp-max">{daily.temp.max.toFixed(0)}</span> / <span className="temp-min">{daily.temp.min.toFixed(0)}</span>
				</div>

				<div className="weather-icon">
					<img src={`https://openweathermap.org/img/wn/${daily.weather[0].icon}@2x.png`} alt='' />
				</div>

				<div className="weather-description">{daily.weather[0].description}</div>
			</div>
		);
	}

	handleScroll(e) {
		let scrollPosition = e.target.scrollLeft;

		if (scrollPosition === 0) {
			this.setState({fadeLeft: false, fadeRight: true});
			return;
		}

		if (scrollPosition === 189) {
			this.setState({fadeLeft: true, fadeRight: false});
			return;
		}

		this.setState({fadeLeft: true, fadeRight: true});
	}

	updateLocationForecast(lat, lng) {
		fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=minutely,hourly,alerts&units=imperial&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`)
			.then(response => response.json())
			.then((data) => {this.setState({ current: data.current, daily: data.daily })})
			.catch((error) => console.error('Error', error));
	}

	render() {
		return (
			<div className={`weather-container${this.state.fadeLeft ? " fade-left" : ""}${this.state.fadeRight ? " fade-right" : ""}`} onScroll={(e) => this.handleScroll(e)}>
				<Media queries={{
					small: "(max-width: 599px)",
					medium: "(min-width: 600px) and (max-width: 1199px)",
					large: "(min-width: 1200px)"
				}}>
					{matches => (
						<React.Fragment>
							{matches.large &&
								this.state.daily.map((daily, i) => {
									return (
										<div key={i}>
											{this.getWeatherCard(daily, i)}
										</div>
									);
								})}
							{(matches.medium || matches.small) &&
								<CarouselProvider
									naturalSlideWidth={100}
									naturalSlideHeight={125}
									totalSlides={this.state.daily.length}
								>
									<Slider>
										{this.state.daily.map((daily, i) => {
											return (
												<Slide key={i}>
													{this.getWeatherCard(daily, i)}
												</Slide>
											);
										})}
									</Slider>

									{this.state.daily.length > 1 &&
									<div className="d-flex mt-2">
										<ButtonBack className="btn">Back</ButtonBack>
										<ButtonNext className="btn">Next</ButtonNext>
									</div>
									}
								</CarouselProvider>
							}
						</React.Fragment>
						)}
				</Media>
			</div>
		);
	}
}

export default WeatherContainer;