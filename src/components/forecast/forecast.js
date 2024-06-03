import React from 'react';
import './forecast.css';
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css'; // Ensure you have the CSS file

const WeekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function Forecast({ data }) {
  const dayInWeek = new Date().getDay();
  const forecastDays = WeekDays.slice(dayInWeek, WeekDays.length).concat(WeekDays.slice(0, dayInWeek));

  return (
    <div className='forecast-container'>
      <label className='title'>Daily Forecast</label>
      <Accordion allowZeroExpanded >
        {data.list.slice(0, 7).map((item, index) => (
          <AccordionItem key={index} className='forecast-item'>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className='daily-item'>
                  <img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt="weather" className='icon-small' />
                  <div className='day-info'>
                    <label className='day'>{forecastDays[index]}</label>
                    <label className='description'>{item.weather[0].description}</label>
                  </div>
                  <label className='min-max'>{Math.round(item.main.temp_min)}°C / {Math.round(item.main.temp_max)}°C</label>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel className='details-panel'>
                <div className='details'>
                    <p className='humidity-icon'><span></span>Humidity: {item.main.humidity}%</p>
                    <p className='wind-speed-icon'><span></span>Wind Speed: {item.wind.speed} m/s</p>
                    <p className='pressure-icon'><span></span>Pressure: {item.main.pressure} hPa</p>
                </div>
            </AccordionItemPanel>

          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export default Forecast;
