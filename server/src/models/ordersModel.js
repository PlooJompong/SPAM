import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  items: [
    {
      _id: { type: String, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      vegetarian: { type: Boolean, required: true },
      ingredients: { type: [String], required: true },
      quantity: { type: Number, required: true },
    },
  ],
  comment: { type: String, default: "" },
  locked: { type: Boolean, default: false },
  done: { type: Boolean, default: false },
  totalPrice: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
