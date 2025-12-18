/**
 * Página de clima
 * Muestra lista de ciudades con su clima actual
 */

import { useState, useEffect } from 'react';
import * as weatherService from '../services/weatherService';
import { WeatherCard } from '../components/weather/WeatherCard';
import { Loading } from '../components/common/Loading';
import './Weather.css';

export const Weather = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await weatherService.getCurrentWeather();
        setWeatherData(response.weather || []);
      } catch (err) {
        setError(err.message || 'Error al cargar el clima');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  // Estado de carga
  if (loading) {
    return <Loading message="Cargando clima..." />;
  }

  // Estado de error
  if (error) {
    return (
      <div className="weather-container">
        <div className="weather-error">
          <div className="weather-error-icon">⚠️</div>
          <h2 className="weather-error-title">Error al cargar el clima</h2>
          <p className="weather-error-message">{error}</p>
          <button 
            className="weather-error-retry"
            onClick={() => window.location.reload()}
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  // Estado vacío
  if (weatherData.length === 0) {
    return (
      <div className="weather-container">
        <div className="weather-empty">
          <div className="weather-empty-icon">🌍</div>
          <h2 className="weather-empty-title">No hay ciudades disponibles</h2>
          <p className="weather-empty-message">
            No se encontraron datos de clima en este momento.
          </p>
        </div>
      </div>
    );
  }

  // Estado con datos
  return (
    <div className="weather-container">
      <div className="weather-header">
        <h1 className="weather-title">Clima Actual</h1>
        <p className="weather-subtitle">
          Información del clima en tiempo real
        </p>
      </div>

      <div className="weather-list">
        {weatherData.map((cityWeather, index) => (
          <WeatherCard 
            key={`${cityWeather.city_name}-${index}`} 
            cityWeather={cityWeather} 
          />
        ))}
      </div>

      <div className="weather-footer">
        <p className="weather-count">
          Mostrando {weatherData.length} {weatherData.length === 1 ? 'ciudad' : 'ciudades'}
        </p>
      </div>
    </div>
  );
};

