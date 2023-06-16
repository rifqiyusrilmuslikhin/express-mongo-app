const CityController = require('../controllers/CityController');

const cityController = new CityController();

module.exports = (app) => {
  app.post('/api/cities', cityController.createCity.bind(cityController));
  app.get('/api/cities', cityController.getAllCities.bind(cityController));
  app.get('/api/cities/:cityId', cityController.getCityById.bind(cityController));
};
