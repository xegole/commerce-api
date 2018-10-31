const mongoose = require('mongoose');

const { Schema } = mongoose;

const CarSchema = new Schema({
  name: { type: String, required: true, unique: true, index: true },
}, { versionKey: false, collection: 'Car' });

/* eslint no-underscore-dangle: 0 */
CarSchema.set('toJSON', {
  virtuals: false,
  transform: (doc, ret) => {
    const car = ret;
    delete car._id;
  },
});

const CarsModel = mongoose.model('Car', CarSchema);

CarsModel.getAll = () => {
  return CarsModel.find({});
};

CarsModel.addCar = (carToAdd) => {
  return carToAdd.save();
};

CarsModel.removeCar = (carName) => {
  return CarsModel.remove({ name: carName });
};

export default CarsModel;
