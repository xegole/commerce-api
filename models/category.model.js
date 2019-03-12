import mongoose from 'mongoose';


const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: { type: String, required: true },
  categoryImage: String,
}, { versionKey: false, collection: 'Category' });

/* eslint no-underscore-dangle: 0 */
CategorySchema.set('toJson', {
  virtuals: false,
  transform: (doc, ret) => {
    const category = ret;
    category.categoryId = category._id;
    delete category._id;
  },
});

const CategoryModel = mongoose.model('Category', CategorySchema);


CategoryModel.getAll = () => {
  return CategoryModel.find({});
};

CategoryModel.addCategory = (categoryToAdd) => {
  return categoryToAdd.save();
};

CategoryModel.deleteCategory = (id) => {
  return CategoryModel.remove(id);
};


export default CategoryModel;

