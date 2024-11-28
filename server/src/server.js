import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/user.js';
import Menu from './models/menu.js';
import Order from './models/orders.js';
import Stock from './models/stockStatus.js';
import cors from 'cors';
import bcrypt from 'bcrypt';

dotenv.config();

const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI;

const app = express();
app.use(cors());
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
}));

mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Enkel test-API
app.get("/", async (req, res) => {
  res.send("Hello, world!");
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
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});


app.post("/users", async (req, res) => {
  try {
    const { username, password, admin } = req.body;

    if (!username || !password || admin === undefined) {
      return res.status(400).json({ message: "Alla fält är obligatoriska." });
    }

    // Kontrollera om användaren redan finns
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: "Användarnamnet är redan taget." });
    }

    // Skapa en ny användare
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, admin });
    await newUser.save();

    res.status(201).json({ message: "Användare skapad!", user: newUser });
  } catch (err) {
    console.error("Fel vid skapandet av användare:", err);
    res.status(500).json({ message: "Något gick fel vid skapandet av användaren." });
  }
});


// POST: Hantera inloggning
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Användarnamn och lösenord krävs." });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "Användaren hittades inte." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Fel lösenord." });
    }

    res.status(200).json({ 
      message: "Inloggning lyckades!", 
      user: { username: user.username, admin: user.admin } 
    });
  } catch (err) {
    console.error("Fel vid inloggning:", err);
    res.status(500).json({ message: "Något gick fel vid inloggningen." });
  }
});








// Hämta alla pizzor
app.get("/menu", async (req, res) => {
  try {
    const menu = await Menu.find();
    res.status(200).json(menu);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Hämta orders
app.get("/order", async (req, res) => {
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
app.get("/stock", async (req, res) => {
  try {
    const stock = await Stock.find();
    res.status(200).json(stock);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
