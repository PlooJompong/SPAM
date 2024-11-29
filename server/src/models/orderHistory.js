import mongoose from 'mongoose';

const orderHistorySchema = new mongoose.Schema({
  userId: { type: String, required: true }, // ID för användaren som la beställningen
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
        },
      ],
      totalPrice: { type: Number, required: true },
      orderDate: { type: Date, default: Date.now },
    },
  ],
});

const OrderHistory = mongoose.model('OrderHistory', orderHistorySchema);
export default OrderHistory;
