import mongoose from 'mongoose';

const stockStatusSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
});

const Stock = mongoose.model('Stock', stockStatusSchema);

export default Stock;
