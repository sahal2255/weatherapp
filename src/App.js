import './App.css';
import Search from './components/search/search';
import CurrentWeather from './components/current-weather/current-weather';
import Forecast from './components/forecast/forecast';
import { Weather_API_URL, Weather_API_KEY } from './api';
import { useState, useEffect } from 'react';

// function App() {
//   const [currentWeather, setCurrentWeather] = useState(null);
//   const [forecast, setForecast] = useState(null);

//   const handleSearchChange = (searchData) => {
//     const [lat, lon] = searchData.value.split(' ');
//     fetchWeatherData(lat, lon, searchData.label);
//   };

//   const fetchWeatherData = (lat, lon, city) => {
//     const CurrentWeatherFetch = fetch(`${Weather_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${Weather_API_KEY}&units=metric`);
//     const foreCastFetch = fetch(`${Weather_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${Weather_API_KEY}&units=metric`);

//     Promise.all([CurrentWeatherFetch, foreCastFetch])
//       .then(async (response) => {
//         const weatherResponse = await response[0].json();
//         const forecastResponse = await response[1].json();

//         setCurrentWeather({ city, ...weatherResponse });
//         setForecast({ city, ...forecastResponse });
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       const { latitude, longitude } = position.coords;
  //       fetchWeatherData(latitude, longitude, "Your Location");
  //     }, (error) => {
  //       console.error("Error getting geolocation: ", error);
  //     });
  //   } else {
  //     console.error("Geolocation is not supported by this browser.");
  //   }
  // }, []);
  function App() {
    const [currentWeather, setCurrentWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [coordinates, setCoordinates] = useState({ lat: null, lon: null, city: '' });
  
    const handleSearchChange = (searchData) => {
      const [lat, lon] = searchData.value.split(' ');
      setCoordinates({ lat, lon, city: searchData.label });
    };
  
    useEffect(() => {
      if (coordinates.lat && coordinates.lon) {
        const fetchWeatherData = async () => {
          try {
            const CurrentWeatherFetch = fetch(`${Weather_API_URL}/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${Weather_API_KEY}&units=metric`);
            const foreCastFetch = fetch(`${Weather_API_URL}/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${Weather_API_KEY}&units=metric`);
  
            const [weatherResponse, forecastResponse] = await Promise.all([CurrentWeatherFetch, foreCastFetch]);
  
            const weatherData = await weatherResponse.json();
            const forecastData = await forecastResponse.json();
  
            setCurrentWeather({ city: coordinates.city, ...weatherData });
            setForecast({ city: coordinates.city, ...forecastData });
          } catch (err) {
            console.log(err);
          }
        };
  
        fetchWeatherData();
      }
    }, [coordinates]);
  return (
    <div className="App">
      <div className="search-container">
        <Search onSearchChange={handleSearchChange} />
      </div>
      <div className="weather-container">
        {currentWeather && <CurrentWeather data={currentWeather} />}
      </div>
      <div className="forecast-container">
        {forecast && <Forecast data={forecast} />}
      </div>
    </div>
  );
}

export default App;
