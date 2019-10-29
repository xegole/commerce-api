import CategoryModel from './category.model';
import CitiesModel from './cities.model';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const CommerceSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: Number, trim: true },
  commerceImage: { type: String, required: true },
  cityId: { type: Schema.Types.ObjectId, ref:  'City'},
  categoryId: { type: Schema.Types.ObjectId, ref: 'Category' },
  address: String,
}, { versionKey: false, collection: 'Commerce' });

/* eslint no-underscore-dangle: 0 */
CommerceSchema.set('toJSON', {
  virtuals: false,
  transform: (doc, ret) => {
    const commerce = ret;
    commerce.category = commerce.categoryId;
    commerce.city = commerce.cityId;
    commerce.commerceId = commerce._id;
    delete commerce._id;
    delete commerce.categoryId;
    delete commerce.cityId;
  },
});

const CommerceModel = mongoose.model('Commerce', CommerceSchema);

CommerceModel.getAll = () => {
  return CommerceModel.find({});
};

CommerceModel.addCommerce = (commerceToAdd) => {
  return commerceToAdd.save();
};

CommerceModel.updateCommerce = (id, commerce) => {
  return CommerceModel.findByIdAndUpdate(id, commerce);
};

CommerceModel.removeCommerce = (id) => {
  return CommerceModel.remove({ _id: id });
};

CommerceModel.getAllByCategoryId = id => {
  return CommerceModel
    .find({ categoryId: id })
    .populate('categoryId', 'name categoryImage -_id')
    .populate('cityId', 'name -_id')
}


export default CommerceModel;
