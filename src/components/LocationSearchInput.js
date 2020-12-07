import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import {geocodeByAddress, getLatLng} from 'react-places-autocomplete';

function LocationSearchInput(props) {

	const handleSelect = address => {
		geocodeByAddress(address)
			.then(results => getLatLng(results[0]))
			.then(latLng => props.onLocationSelected(latLng))
			.catch(error => console.error('Error', error));

		props.updateAddress(address);
	};

	return (
		<div className="location-search-container">
			<PlacesAutocomplete
				value={props.address}
				onChange={(address) => props.updateAddress(address)}
				onSelect={handleSelect}
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
									<div key={i} className={suggestion.active ? 'suggestion-item suggestion-item--hover' : 'suggestion-item'} {...getSuggestionItemProps(suggestion)}>
										<span>{suggestion.description}</span>
									</div>
								);
							})}
						</div>
					</div>
				)}
			</PlacesAutocomplete>
		</div>
	);
}

export default LocationSearchInput;