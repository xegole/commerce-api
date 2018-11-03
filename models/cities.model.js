const mongoose = require('mongoose');

const { Schema } = mongoose;

const CitySchema = new Schema({
  name: { type: String, required: true },
  latitude: { type: String, required: true },
  longitude: { type: String, required: true },
}, { versionKey: false, collection: 'City' });

/* eslint no-underscore-dangle: 0 */
CitySchema.set('toJSON', {
  virtuals: false,
  transform: (doc, ret) => {
    const city = ret;
    city.cityId = city._id;
    delete city._id;
  },
});

const CityModel = mongoose.model('City', CitySchema);

CityModel.getAll = () => {
  return CityModel.find({});
};

CityModel.addCity = (cityToAdd) => {
  return cityToAdd.save();
};

CityModel.removeCity = (id) => {
  return CityModel.remove({ idCity: id });
};

export default CityModel;
