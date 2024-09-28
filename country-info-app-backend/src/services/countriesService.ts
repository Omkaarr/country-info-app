import axios from 'axios';
import { cache } from '../utils/cache';

const API_URL = 'https://restcountries.com/v3.1';

export const getAllCountries = async () => {
  const cachedData = cache.get('allCountries');
  if (cachedData) return cachedData;

  const response = await axios.get(`${API_URL}/all`);
 
  const countries = response.data;

  cache.set('allCountries', countries);
  return countries;
};

export const getCountryByCode = async (code: string) => {
  const response = await axios.get(`${API_URL}/alpha/${code}`);
  return response.data;
};

export const getCountriesByRegion = async (region: string) => {
  const response = await axios.get(`${API_URL}/region/${region}`);
  return response.data;
};

export const searchCountries = async (name?: string, capital?: string, region?: string, timezone?: string) => {
  const params = { name, capital, region, timezone };
  const response = await axios.get(`${API_URL}/all`, { params });
  return response.data;
};
