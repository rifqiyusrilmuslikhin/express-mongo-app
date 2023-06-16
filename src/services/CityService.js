const City = require('../models/City');

class CityService {
  async createCity(name) {
    const city = new City({ name });
    return await city.save();
  }

  async getAllCities() {
    return await City.find().select('-__v');
  }

  async getCityById(cityId) {
    return await City.findById(cityId).select('-__v');
  }

  async getCityByName(name) {
    return await City.findOne({ name });
  }
}

module.exports = CityService;
