import { Router } from 'express';
import categoryController from '../controllers/category.controller';
const router = new Router();

router.get('', (req, res) => {
  categoryController.getAll(req, res);
});

router.post('', (req, res) => {
  categoryController.addCategory(req, res);
});

export default router;
