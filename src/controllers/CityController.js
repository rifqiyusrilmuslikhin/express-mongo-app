const { isValidObjectId } = require('mongoose');
const CityService = require('../services/CityService');
const NotFoundError = require('../exceptions/NotFoundError');

class CityController {
  constructor() {
    this.cityService = new CityService();
  }

  async createCity(req, res, next) {
    try {
      const { cities } = req.body;
  
      const createdCities = [];
    
      // eslint-disable-next-line no-restricted-syntax
      for (const cityData of cities) {
        const { name } = cityData;
  
        // eslint-disable-next-line no-await-in-loop
        const existingCity = await this.cityService.getCityByName(name);
        if (existingCity) {
          // eslint-disable-next-line no-continue
          continue;
        }
  
        // eslint-disable-next-line no-await-in-loop
        const city = await this.cityService.createCity(name);
        createdCities.push(city);
      }
  
      if (createdCities.length === 0) {
        res.status(409).json({ message: 'City already exists' });
      } else {
        res.status(201).json(createdCities);
      }
    } catch (error) {
      next(error);
    }
  }  

  async getAllCities(req, res, next) {
    try {
      const cities = await this.cityService.getAllCities();
      res.status(200).json(cities);
    } catch (error) {
      next(error);
    }
  }

  async getCityById(req, res, next) {
    try {
      const { cityId } = req.params;

      if (!isValidObjectId(cityId)) {
        throw new NotFoundError('City not found');
      }

      const city = await this.cityService.getCityById(cityId);
      if (!city) {
        throw new NotFoundError('City not found');
      }
      res.status(200).json(city);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CityController;
