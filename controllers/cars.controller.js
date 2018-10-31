import Car from '../models/cars.model';
import logger from '../core/logger/app-logger';

const controller = {};
const response = {};

controller.getAll = async (req, res) => {
  try {
    const cars = await Car.getAll();
    logger.info('sending all cars...');
    response.message = 'SUCCESS';
    response.result = cars;
    res.json(response);
  } catch (err) {
    logger.error(`Error in getting cars- ${err}`);
    res.json('Got error in getAll');
  }
};

controller.addCar = async (req, res) => {
  const carToAdd = new Car({
    name: req.body.name,
  });
  try {
    const savedCar = await Car.addCar(carToAdd);
    logger.info('Adding car...');
    response.message = 'SUCCESS';
    response.result = savedCar;
    res.json(response);
  } catch (err) {
    logger.error(`Error in getting cars- ${err}`);
    res.json(err);
  }
};

controller.deleteCar = async (req, res) => {
  const carName = req.body.name;
  try {
    const removedCar = await Car.removeCar(carName);
    logger.info(`Deleted Car- ${removedCar}`);
    res.send('Car successfully deleted');
  } catch (err) {
    logger.error(`Failed to delete car- ${err}`);
    res.send('Delete failed..!');
  }
};

export default controller;
