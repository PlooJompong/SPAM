import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
