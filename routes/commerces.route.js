import { Router } from 'express';
import commercesController from '../controllers/commerces.controller';


const router = new Router();

router.get('/allcommerces', (req, res) => {
  commercesController.getAll(req, res);
});

router.post('/addcommerce', (req, res) => {
  commercesController.addCommerce(req, res);
});

router.delete('/deletecommerce', (req, res) => {
  commercesController.deleteCommerce(req, res);
});

export default router;
