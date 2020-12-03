import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import {geocodeByAddress, getLatLng} from 'react-places-autocomplete';

class LocationSearchInput extends React.Component {

	handleSelect = address => {
		geocodeByAddress(address)
			.then(results => getLatLng(results[0]))
			.then(latLng => this.props.onLocationSelected(latLng))
			.catch(error => console.error('Error', error));

		this.props.updateAddress(address);
	};

	render() {
		return (
			<PlacesAutocomplete
				value={this.props.address}
				onChange={(address) => this.props.updateAddress(address)}
				onSelect={this.handleSelect}
			>
				{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
					<div>
						<input
							{...getInputProps({
								placeholder: 'Search Places ...',
								className: 'location-search-input',
							})}
						/>
						<div className={`autocomplete-dropdown-container ${suggestions.length > 0 ? 'd-block' : 'd-none' }`}>
							{loading && <div>Loading...</div>}
							{suggestions.map((suggestion, i) => {
								return (
									<div key={i} className={suggestion.active ? 'suggestion-item--hover' : 'suggestion-item'} {...getSuggestionItemProps(suggestion)}>
										<span>{suggestion.description}</span>
									</div>
								);
							})}
						</div>
					</div>
				)}
			</PlacesAutocomplete>
		);
	}
}

export default LocationSearchInput;