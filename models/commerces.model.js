const mongoose = require('mongoose');

const { Schema } = mongoose;

const CommerceSchema = new Schema({
  idCommerce: { type: Number, unique: true, required: true, dropDups: true },
  name: { type: String, required: true },
  phone: { type: Number, required: false },
  commerceImage: { type: String, required: true },
}, { versionKey: false, collection: 'Commerce' });

/* eslint no-underscore-dangle: 0 */
CommerceSchema.set('toJSON', {
  virtuals: false,
  transform: (doc, ret) => {
    const commerce = ret;
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

CommerceModel.removeCommerce = (id) => {
  return CommerceModel.remove({ idCommerce: id });
};

export default CommerceModel;
