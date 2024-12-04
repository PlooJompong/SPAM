import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: {type: Number, required: true  },
  vegetarian: { type: Boolean, required: false },
  ingredients: { type: Array, required: true }
});

const Menu = mongoose.model('Menu', menuSchema);

export default Menu;
