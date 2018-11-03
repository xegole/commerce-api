import multer from 'multer';
import Banner from '../models/banner.model';
import logger from '../core/logger/app-logger';

const controller = {};
const response = {};

controller.getAll = async (req, res) => {
  try {
    const banners = await Banner.getAll();
    logger.info('Getting all banners...');
    response.message = 'success';
    response.result = banners;
    res.json(response);
  } catch (error) {
    logger.error(error);
    res.json(error);
  }
};

controller.deleteBanner = async (req, res) => {
  const idBanner = req.body.idBanner;
  try {
    const bannerRemoved = await Banner.removeBanner(idBanner);
    if (bannerRemoved) {
      response.message = 'success';
      response.result = 'Banner deleted';
    } else {
      response.message = 'failure';
      response.result = 'Error, dont delete banner';
    }
    res.json(response);
  } catch (error) {
    logger.error(error);
    res.json(error);
  }
};

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const filter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    const error = {};
    error.message = 'mimeType don\'t supported';
    cb(error, true);
  }
};

const upload = multer({
  storage: diskStorage,
  limits: {
    fileSize: 1024 * 1024 * 1,
  },
  fileFilter: filter,
}).single('bannerImage');

controller.addBanner = async (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.json(err);
    }
    uploadImage(req, res);
  });
};

const uploadImage = async (req, res) => {
  logger.info(`Adding Commerce ${req.file.path}`);
  const bannerToAdd = new Banner(req.body);
  bannerToAdd.bannerImage = req.file.path;
  try {
    const savedBanner = await Banner.addBanner(bannerToAdd);
    logger.info('Adding banner...');
    response.message = 'success';
    response.result = savedBanner;
    res.json(response);
  } catch (err) {
    logger.error(`Error saving banner- ${err}`);
    res.json(err);
  }
};

export default controller;
