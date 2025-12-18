/**
 * Componente para mostrar información del clima de una ciudad
 */

import { useNavigate } from 'react-router-dom';
import './WeatherCard.css';

export const WeatherCard = ({ cityWeather }) => {
  const navigate = useNavigate();
  const { city_name, temperature, weather_condition, weather_description, lat, long } = cityWeather;

  // Mapeo de condiciones climáticas a emojis
  const weatherIcons = {
    'Clear': '☀️',
    'Clouds': '☁️',
    'Rain': '🌧️',
    'Drizzle': '🌦️',
    'Thunderstorm': '⛈️',
    'Snow': '❄️',
    'Mist': '🌫️',
    'Fog': '🌫️',
    'Haze': '🌫️',
  };

  const icon = weatherIcons[weather_condition] || '🌤️';

  const handleClick = () => {
    navigate(`/weather/forecast/${lat}/${long}`);
  };

  return (
    <div className="weather-card weather-card-clickable" onClick={handleClick}>
      <div className="weather-card-icon">
        {icon}
      </div>
      
      <div className="weather-card-info">
        <h3 className="weather-card-city">{city_name}</h3>
        <p className="weather-card-description">{weather_description}</p>
      </div>
      
      <div className="weather-card-temperature">
        <span className="weather-card-temp-value">{Math.round(temperature)}</span>
        <span className="weather-card-temp-unit">°C</span>
      </div>

      <div className="weather-card-arrow">
        →
      </div>
    </div>
  );
};

