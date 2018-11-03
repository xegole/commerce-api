import { Router } from 'express';
import citiesController from '../controllers/cities.controller';

const router = new Router();

router.get('/allcities', (req, res) => {
  citiesController.getAll(req, res);
});

router.post('/addcity', (req, res) => {
  citiesController.addCity(req, res);
});

router.delete('/deletecity', (req, res) => {
  citiesController.deleteCity(req, res);
});

export default router;
