const mongoose = require('mongoose');

const { Schema } = mongoose;

const CommerceSchema = new Schema({
  name: { type: String, required: true },
  phone: Number,
  commerceImage: { type: String, required: true },
  cityId: { type: String, required: true },
  categoryId: { type: String, required: true },
  address: String,
}, { versionKey: false, collection: 'Commerce' });

/* eslint no-underscore-dangle: 0 */
CommerceSchema.set('toJSON', {
  virtuals: false,
  transform: (doc, ret) => {
    const commerce = ret;
    commerce.commerceId = commerce._id;
    delete commerce._id;
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

export default CommerceModel;
