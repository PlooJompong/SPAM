import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/user.js';
import Menu from './models/menu.js';
import Order from './models/orders.js';
import Stock from './models/stockStatus.js';
import cors from 'cors';


dotenv.config();

const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI;

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
}));

mongoose.connect(process.env.MONGO_URI, {})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Enkel test-API
app.get('/', async (req, res) => {
  res.send('Hello, world!');
});

// Hämta alla objekt
// app.get('/items', async (req, res) => {
//   try {
//     const items = await Item.find();
//     res.status(200).json(items);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// Hämta alla användare
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
})

// Hämta alla pizzor
app.get('/menu', async (req, res) => {
  try {
    const menu = await Menu.find();
    res.status(200).json(menu);
  } catch (err) {
    res.status(500).json(err);
  }
})

// Hämta orders
app.get('/order', async (req, res) => {
  try {
    const order = await Order.find();
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json(err);
  }
})
app.post('/orders', async (req, res) => {
  try {
    const { name, items, totalPrice, orderDate } = req.body;

    // Validera att nödvändiga fält finns
    if (!name || !items || items.length === 0 || !totalPrice) {
      return res.status(400).json({ message: 'Namn, varor och totalpris krävs.' });
    }

    // Skapa en ny beställning
    const newOrder = new Order({
      name, // Namn på personen som gör beställningen
      items, // Varukorgens innehåll
      totalPrice, // Totalt pris
      orderDate, // Datum för beställningen
    });

    // Spara beställningen i databasen
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    console.error('Kunde inte spara beställningen:', err);
    res.status(500).json({ message: 'Något gick fel vid skapandet av beställningen.' });
  }
});


// Lagerstatus
app.get('/stock', async (req, res) => {
  try {
    const stock = await Stock.find();
    res.status(200).json(stock);
  } catch (err) {
    res.status(500).json(err);
  }
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});