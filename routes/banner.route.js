import { Router } from 'express';
import bannerController from '../controllers/banner.controller';

const router = new Router();

router.get('', (req, res) => {
  bannerController.getAll(req, res);
});

router.post('', (req, res) => {
  bannerController.addBanner(req, res);
});

export default router;
