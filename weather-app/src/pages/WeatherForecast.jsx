/**
 * Página de pronóstico de 5 días
 * Muestra el pronóstico del clima para una ciudad específica
 */

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as weatherService from '../services/weatherService';
import { ForecastCard } from '../components/weather/ForecastCard';
import { Loading } from '../components/common/Loading';
import { Button } from '../components/common/Button';
import './WeatherForecast.css';

export const WeatherForecast = () => {
  const { lat, lon } = useParams();
  const navigate = useNavigate();
  
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await weatherService.getForecast(lat, lon);
        setForecastData(response || []);
      } catch (err) {
        setError(err.message || 'Error al cargar el pronóstico');
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
  }, [lat, lon]);

  // Estado de carga
  if (loading) {
    return <Loading message="Cargando pronóstico..." />;
  }

  // Estado de error
  if (error) {
    return (
      <div className="forecast-container">
        <div className="forecast-error">
          <div className="forecast-error-icon">⚠️</div>
          <h2 className="forecast-error-title">Error al cargar el pronóstico</h2>
          <p className="forecast-error-message">{error}</p>
          <div className="forecast-error-actions">
            <Button onClick={() => navigate('/weather')}>
              Volver a Ciudades
            </Button>
            <Button 
              variant="outline"
              onClick={() => window.location.reload()}
            >
              Reintentar
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Estado vacío
  if (forecastData.length === 0) {
    return (
      <div className="forecast-container">
        <div className="forecast-empty">
          <div className="forecast-empty-icon">🌍</div>
          <h2 className="forecast-empty-title">No hay pronóstico disponible</h2>
          <p className="forecast-empty-message">
            No se encontraron datos de pronóstico para esta ubicación.
          </p>
          <Button onClick={() => navigate('/weather')}>
            Volver a Ciudades
          </Button>
        </div>
      </div>
    );
  }

  // Estado con datos
  return (
    <div className="forecast-container">
      <div className="forecast-header">
        <Button 
          variant="outline" 
          onClick={() => navigate('/weather')}
          className="forecast-back-btn"
        >
          ← Volver
        </Button>
        <div className="forecast-header-content">
          <h1 className="forecast-title">Pronóstico de 5 Días</h1>
          <p className="forecast-subtitle">
            Temperaturas máximas y mínimas
          </p>
        </div>
      </div>

      <div className="forecast-list">
        {forecastData.map((forecast, index) => (
          <ForecastCard 
            key={`${forecast.date}-${index}`} 
            forecast={forecast} 
          />
        ))}
      </div>

      <div className="forecast-footer">
        <p className="forecast-info">
          📍 Coordenadas: {parseFloat(lat).toFixed(4)}, {parseFloat(lon).toFixed(4)}
        </p>
      </div>
    </div>
  );
};

