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
    },
  ],
  totalPrice: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
