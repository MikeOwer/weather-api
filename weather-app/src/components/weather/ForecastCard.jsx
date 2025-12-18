/**
 * Componente para mostrar el pronóstico de un día específico
 */

import './ForecastCard.css';

export const ForecastCard = ({ forecast }) => {
  const { date, temp_max, temp_min, weather_condition, weather_description } = forecast;

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

  // Formatear fecha para mostrar día de la semana
  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    
    return {
      dayName: days[dateObj.getDay()],
      day: dateObj.getDate(),
      month: months[dateObj.getMonth()]
    };
  };

  const { dayName, day, month } = formatDate(date);

  return (
    <div className="forecast-card">
      <div className="forecast-card-date">
        <span className="forecast-card-day-name">{dayName}</span>
        <span className="forecast-card-day">{day} {month}</span>
      </div>
      
      <div className="forecast-card-icon">
        {icon}
      </div>
      
      <div className="forecast-card-temps">
        <div className="forecast-card-temp-max">
          <span className="forecast-card-temp-label">Máx</span>
          <span className="forecast-card-temp-value">{Math.round(temp_max)}°</span>
        </div>
        <div className="forecast-card-temp-min">
          <span className="forecast-card-temp-label">Mín</span>
          <span className="forecast-card-temp-value">{Math.round(temp_min)}°</span>
        </div>
      </div>
      
      <div className="forecast-card-condition">
        <span className="forecast-card-description">{weather_description}</span>
      </div>
    </div>
  );
};

