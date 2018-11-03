import multer from 'multer';
import Category from '../models/category.model';
import logger from '../core/logger/app-logger';

const controller = {};
const response = {};

controller.getAll = async (req, res) => {
  try {
    const categories = await Category.getAll();
    response.message = 'success';
    response.result = categories;
    res.json(response);
  } catch (error) {
    logger.error(error);
    res.json(error);
  }
};

controller.deleteCategory = async (req, res) => {
  const categoryId = req.body.categoryId;
  try {
    const removedCategory = await Category.deleteCategory(categoryId);
    logger.info(`Deleted category => ${removedCategory}`);
    response.result = 'Category successfully deleted';
    response.message = 'success';
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

const upload = multer({
  storage: diskStorage,
  limits: {
    fileSize: 1024 * 1024 * 1,
  },
});

controller.addCategory = async (req, res) => {
  upload(req, res, (error) => {
    if (error) { res.json(error); }
    uploadImage(req, res);
  });
};

const uploadImage = async (req, res) => {
  const categoryToAdd = new Category(req.body);
  categoryToAdd.categoryImage = req.file.path;
  try {
    const savedCategory = await Category.addCategory(categoryToAdd);
    response.message = 'success';
    response.result = savedCategory;
    res.json(response);
  } catch (error) {
    logger.error(error);
    res.json(error);
  }
};

export default controller;
