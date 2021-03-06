import multer from 'multer';
import Commerce from '../models/commerces.model';
import logger from '../core/logger/app-logger';

const controller = {};
const response = {};

controller.getAll = async (req, res) => {
  try {
    const commerces = await Commerce.getAll();
    logger.info('sending all commerces...');
    response.message = 'success';
    response.result = commerces;
    res.json(response);
  } catch (err) {
    logger.error(`Error in getting commerces- ${err}`);
    res.json(err);
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
    fileSize: 1024 * 1024 * 1, // 1mb size image
  },
  fileFilter: filter,
}).single('commerceImage');

controller.addCommerce = async (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.json(err);
    }
    uploadImage(req, res);
  });
};

const uploadImage = async (req, res) => {
  const commerceToAdd = new Commerce(req.body);
  commerceToAdd.commerceImage = req.file.path;
  try {
    const savedCommerce = await Commerce.addCommerce(commerceToAdd);
    logger.info('Adding commerce...');
    response.message = 'success';
    response.result = savedCommerce;
    res.json(response);
  } catch (err) {
    logger.error(`Error in getting commerces- ${err}`);
    res.json(err);
  }
};

controller.updateCommerce = async (req, res) => {
  const commerceId = req.body.commerceId;
  try {
    const updateCommerce = await Commerce.updateCommerce(commerceId, req.body);
    response.message = 'success';
    response.result = updateCommerce;
    res.json(response);
  } catch (error) {
    res.json(error);
  }
};

controller.deleteCommerce = async (req, res) => {
  const idCommerce = req.body.idCommerce;
  try {
    const removedCommerce = await Commerce.removeCommerce(idCommerce);
    logger.info(`Deleted Commerce- ${removedCommerce}`);
    response.message = 'success';
    response.result = 'Commerce successfully deleted';
    res.json(response);
  } catch (err) {
    logger.error(`Failed to delete commerce- ${err}`);
    res.send(err);
  }
};


controller.getCommercesByCategoryId = async (req, res) => {
  const idCategory = req.query.categoryId;
  console.log('entre', idCategory);
  try {
    const commercesByCategoryId = await Commerce.getAllByCategoryId(idCategory);
    logger.info(`Commerce categoryId- ${commercesByCategoryId}`);
    response.message = 'success';
    response.result = commercesByCategoryId;
    res.json(response);
  }catch (err) {
    logger.error(`Failed to get commerce by categoryId- ${err}`)
  }
}

export default controller;
