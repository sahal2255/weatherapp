import './current-weather.css';

function CurrentWeather({ data }) {
  return (
    <div className='current-weather'>
      <div className='top'>
        <p className='city'>{data.city}</p>
        <p className='weather-description'>{data.weather[0].description}</p>
      </div>
      <div className='middle'>
        <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="weather" className='weather-icon' />
      </div>
      <div className='bottom'>
        <div className='temperature'>
          <span className='value'>{Math.round(data.main.temp)}°C</span>
          <span className='label'>Temperature</span>
        </div>
        <div className='humidity'>
          <span className='value'>{data.main.humidity}%</span>
          <span className='label'>Humidity</span>
        </div>
        <div className='wind-speed'>
          <span className='value'>{data.wind.speed} m/s</span>
          <span className='label'>Wind Speed</span>
        </div>
        <div className='additional-info'>
          <span className='value'>{data.main.pressure} hPa</span>
          <span className='label'>Pressure</span>
        </div>
      </div>
    </div>
  );
}

export default CurrentWeather;
