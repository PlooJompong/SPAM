// import mongoose from 'mongoose';

// const orderSchema = new mongoose.Schema({
//   name: { type: String, required: true },
// });

// const Order = mongoose.model('Order', orderSchema);

// export default Order;


import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Namn på kunden eller något annat
  items: [
    {
      _id: { type: String, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      vegetarian: { type: Boolean, required: true },
      ingredients: { type: [String], required: true },
      quantity: { type: Number, required: true },
      comment: { type: String, required: false },
      locked: { type: Boolean, required: false },
      done: { type: Boolean, required: false },
    },
  ],
  totalPrice: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
