import multer from "multer";
import Commerce from "../models/commerces.model";
import logger from "../core/logger/app-logger";

const controller = {};
const response = {};

controller.getAll = async (req, res) => {
  try {
    const commerces = await Commerce.getAll();
    logger.info("sending all commerces...");
    response.message = "success";
    response.result = commerces;
    res.json(response);
  } catch (err) {
    logger.error(`Error in getting commerces- ${err}`);
    res.json(err);
  }
};

// Set storage engine
const storage = multer.diskStorage({
  destination: "./public/uploads",
  filename: function(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 1
  },
  fileFilter: function(req, file, cb) {
    sanitizeFile(file, cb);
  }
}).single("commerceImage");

controller.addCommerce = async (req, res) => {
  upload(req, res, err => {
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
    logger.info("Adding commerce...");
    response.message = "success";
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
    response.message = "success";
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
    response.message = "success";
    response.result = "Commerce successfully deleted";
    res.json(response);
  } catch (err) {
    logger.error(`Failed to delete commerce- ${err}`);
    res.send(err);
  }
};

controller.getCommercesByCategoryId = async (req, res) => {
  const idCategory = req.query.categoryId;
  console.log("entre", idCategory);
  try {
    const commercesByCategoryId = await Commerce.getAllByCategoryId(idCategory);
    logger.info(`Commerce categoryId- ${commercesByCategoryId}`);
    response.message = "success";
    response.result = commercesByCategoryId;
    res.json(response);
  } catch (err) {
    logger.error(`Failed to get commerce by categoryId- ${err}`);
  }
};

function sanitizeFile(file, cb) {
  let fileExts = ["png", "jpg", "jpeg", "gif"];
  let isAllowedExt = fileExts.includes(
    file.originalname.split(".")[1].toLowerCase()
  );
  let isAllowedMimeType = file.mimetype.startsWith("image/");
  if (isAllowedExt && isAllowedMimeType) {
    return cb(null, true);
  } else {
    cb("Error: File type not allowed!");
  }
}

export default controller;
