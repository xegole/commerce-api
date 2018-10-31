import City from '../models/cities.model';
import logger from '../core/logger/app-logger';

const controller = {};
const response = {};

controller.getAll = async (req, res) => {
  try {
    const cities = await City.getAll();
    response.message = 'success';
    response.result = cities;
    res.json(response);
  } catch (error) {
    res.json(error);
  }
};

controller.addCity = async (req, res) => {
  const cityToAdd = new City({
    idCity: req.body.idCity,
    name: req.body.name,
    longitude: req.body.longitude,
    latitude: req.body.latitude,
  });

  try {
    const savedCity = await City.addCity(cityToAdd);
    response.message = 'success';
    response.result = savedCity;
    res.json(response);
  } catch (error) {
    res.json(error);
  }
};

controller.deleteCity = async (req, res) => {
  const idCity = req.body.idCity;

  try {
    const removedCity = await City.removedCity(idCity);
    logger.info(`Deleted city- ${removedCity}`);
    res.send('City successfully deleted');
  } catch (error) {
    res.json(error);
  }
};

export default controller;
