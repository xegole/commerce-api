import { Router } from 'express';
import carController from '../controllers/cars.controller';

const router = new Router();

router.get('/allcars', (req, res) => {
  carController.getAll(req, res);
});

router.post('/addcar', (req, res) => {
  carController.addCar(req, res);
});

router.delete('/deletecar', (req, res) => {
  carController.deleteCar(req, res);
});

export default router;
