const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(); // Läser in miljövariabler från .env-filen

const app = express();
app.use(express.json()); // För att hantera JSON-data

// const PORT = process.env.PORT || 8000;
const PORT = 3000;

const Item = require('./models/Item');

// Skapa ett nytt objekt
// app.post('/items', async (req, res) => {
//   try {
//     console.log("Request body:", req.body); // Loggar inkommande data
//     const newItem = new Item(req.body);
//     const savedItem = await newItem.save();
//     console.log("Saved item:", savedItem); // Loggar det sparade objektet
//     res.status(201).json(savedItem);
//   } catch (err) {
//     console.error("Error in POST /items:", err); // Loggar felet
//     res.status(500).json({ error: err.message }); // Skicka tillbaka felet
//   }
// });

// // Hämta alla objekt
// app.get('/items', async (req, res) => {
//   try {
//     const items = await Item.find();
//     res.status(200).json(items);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // Uppdatera ett objekt
// app.put('/items/:id', async (req, res) => {
//   try {
//     const updatedItem = await Item.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     res.status(200).json(updatedItem);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // Ta bort ett objekt
// app.delete('/items/:id', async (req, res) => {
//   try {
//     await Item.findByIdAndDelete(req.params.id);
//     res.status(200).json("Item deleted");
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// Koppla till MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Enkel test-API
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});