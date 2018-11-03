import mongoose from 'mongoose';

const { Schema } = mongoose;

const BannerSchema = new Schema({
  name: { type: String, trim: true },
  description: String,
  duration: Number,
  bannerImage: { type: String, required: false },
}, { versionKey: false, collection: 'Banner' });

/* eslint no-underscore-dangle: 0 */
BannerSchema.set('toJSON', {
  virtuals: false,
  transform: (doc, ret) => {
    const banner = ret;
    banner.bannerId = banner._id;
    delete banner._id;
  },
});

const BannerModel = mongoose.model('Banner', BannerSchema);

BannerModel.getAll = () => {
  return BannerModel.find({});
};

BannerModel.addBanner = (bannerToAdd) => {
  return bannerToAdd.save();
};

BannerModel.removeBanner = (id) => {
  return BannerModel.remove({ idBanner: id });
};

export default BannerModel;
