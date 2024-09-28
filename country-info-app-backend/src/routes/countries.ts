import express from 'express';
import { getAllCountries, getCountryByCode, getCountriesByRegion, searchCountries } from '../services/countriesService';

const router = express.Router();

// GET /countries
router.get('/', async (req, res, next) => {
  try {
    const countries = await getAllCountries();
    res.json(countries);
  } catch (error) {
    next(error);
  }
});

// GET /countries/:code
router.get('/:code', async (req, res, next) => {
  try {
    const country = await getCountryByCode(req.params.code);
    res.json(country);
  } catch (error) {
    next(error);
  }
});

// GET /countries/region/:region
router.get('/region/:region', async (req, res, next) => {
  try {
    const countries = await getCountriesByRegion(req.params.region);
    res.json(countries);
  } catch (error) {
    next(error);
  }
});

// GET /countries/search
router.get('/search', async (req, res, next) => {
  try {
    const { name, capital, region, timezone } = req.query;

    // Type assertion to ensure values are treated as strings or undefined
    const countries = await searchCountries(
      name as string | undefined,
      capital as string | undefined,
      region as string | undefined,
      timezone as string | undefined
    );
    
    res.json(countries);
  } catch (error) {
    next(error);
  }
});

export default router;
