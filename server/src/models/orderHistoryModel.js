import mongoose from "mongoose";

const orderHistorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  orders: [
    {
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
      totalPrice: { type: Number, required: true },
      orderDate: { type: Date, default: Date.now },
      comment: { type: String },
    },
  ],
});

const OrderHistory = mongoose.model("OrderHistory", orderHistorySchema);

export default OrderHistory;
