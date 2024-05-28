import React, { useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import { GEO_API_URL, geoApiOptions } from '../../api';

function Search({ onSearchChange }) {
  const [search, setSearch] = useState(null);

  const loadOptions = (inputValue) => {
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        // Map the response data to the format expected by react-select-async-paginate
        const options = response.data.map((city) => ({
          
            value: `${city.latitude } ${city.longitude}`,
            label:`${city.name}, ${city.countryCode}`,
          
        }));
        return { options };
      })
      .catch((error) => {
        console.error(error);
        return { options: [] }; // Return an empty options array in case of an error
      });
  };

  const handleChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <div>
      <AsyncPaginate
        placeholder="Search city"
        debounceTimeout={600}
        value={search}
        onChange={handleChange}
        loadOptions={loadOptions}
      />
    </div>
  );
}

export default Search;

