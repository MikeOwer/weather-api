/**
 * Servicio de clima
 * Maneja las operaciones relacionadas con el clima de ciudades
 */

import { api } from './apiService';

/**
 * Obtiene el clima actual de todas las ciudades
 * @returns {Promise<Object>} - { weather: Array, count: number }
 */
export const getCurrentWeather = async () => {
  return await api.get('/weather/current');
};

/**
 * Obtiene el pronóstico de los próximos 5 días para una ciudad
 * @param {number} lat - Latitud de la ciudad
 * @param {number} lon - Longitud de la ciudad
 * @returns {Promise<Array>} - Array con pronóstico de 5 días
 */
export const getForecast = async (lat, lon) => {
  return await api.get(`/weather/days?lat=${lat}&lon=${lon}`);
};

