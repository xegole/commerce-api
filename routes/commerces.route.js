import { Router } from 'express';
import commercesController from '../controllers/commerces.controller';

const router = new Router();

router.get('/allcommerces', (req, res) => {
  commercesController.getAll(req, res);
});

router.get('/bycategory', (req, res) => {
  commercesController.getCommercesByCategoryId(req, res);
})

router.post('/addcommerce', (req, res) => {
  commercesController.addCommerce(req, res);
});

router.post('/updatecommerce', (req, res) => {
  commercesController.updateCommerce(req, res);
});

router.delete('/deletecommerce', (req, res) => {
  commercesController.deleteCommerce(req, res);
});

export default router;
