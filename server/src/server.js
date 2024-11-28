import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/user.js';
import Menu from './models/menu.js';
import Order from './models/orders.js';
import Stock from './models/stockStatus.js';
import cors from 'cors';
import bcrypt from 'bcrypt';
import OrderHistory from './models/orderHistory.js'; 

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

// Ändra alla pizzor
app.put("/menu/:id", async (req, res) => {
  try {
    const { id } = req.params; // Hämta ID från URL:en
    const { name, price, vegetarian, ingredients } = req.body; // Hämta uppdaterade värden från request-body

    // Kontrollera att alla nödvändiga fält finns
    if (!name || !price || !Array.isArray(ingredients)) {
      return res.status(400).json({ message: "Alla obligatoriska fält måste fyllas i." });
    }

    // Hitta och uppdatera menyalternativet i databasen
    const updatedMenuItem = await Menu.findByIdAndUpdate(
      id,
      { name, price, vegetarian, ingredients },
      { new: true } // Returnera det uppdaterade objektet
    );

    if (!updatedMenuItem) {
      return res.status(404).json({ message: "Menyartikel hittades inte." });
    }

    // Returnera den uppdaterade menyalternativet
    res.status(200).json({ message: "Menyartikel uppdaterad!", menu: updatedMenuItem });
  } catch (err) {
    console.error("Fel vid uppdatering av menyartikel:", err);
    res.status(500).json({ message: "Ett fel inträffade vid uppdatering av menyartikel." });
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

app.put("/orders/:id", async (req, res) => {
  try {
    const { id } = req.params; // ID för den order som ska uppdateras
    const { name, items, totalPrice, orderDate } = req.body; // Nya värden från body

    // Kontrollera att obligatoriska fält finns
    if (!name || !items || !totalPrice || !Array.isArray(items)) {
      return res.status(400).json({ message: "Alla obligatoriska fält måste fyllas i." });
    }

    // Hitta och uppdatera ordern i databasen
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { name, items, totalPrice, orderDate },
      { new: true } // Returnera den uppdaterade ordern
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Ordern hittades inte." });
    }

    res.status(200).json({ message: "Order uppdaterad!", order: updatedOrder });
  } catch (err) {
    console.error("Fel vid uppdatering av order:", err);
    res.status(500).json({ message: "Ett fel inträffade vid uppdatering av order." });
  }
});

app.delete("/orders/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Kontrollera att ID är giltigt
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Ogiltigt ID-format." });
    }

    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({ message: "Ordern hittades inte." });
    }

    res.status(200).json({ message: "Order raderad!", order: deletedOrder });
  } catch (err) {
    console.error("Fel vid borttagning av order:", err);
    res.status(500).json({ message: "Ett fel inträffade vid borttagning av order." });
  }
});



// app.post('/orders', async (req, res) => {
//   try {
//     const { name, items, totalPrice, orderDate } = req.body;

//     // Validera att nödvändiga fält finns
//     if (!name || !items || items.length === 0 || !totalPrice) {
//       return res.status(400).json({ message: 'Namn, varor och totalpris krävs.' });
//     }

//     // Skapa en ny beställning
//     const newOrder = new Order({
//       name, // Namn på personen som gör beställningen
//       items, // Varukorgens innehåll
//       totalPrice, // Totalt pris
//       orderDate, // Datum för beställningen
//     });

//     // Spara beställningen i databasen
//     const savedOrder = await newOrder.save();
//     res.status(201).json(savedOrder);
//   } catch (err) {
//     console.error('Kunde inte spara beställningen:', err);
//     res.status(500).json({ message: 'Något gick fel vid skapandet av beställningen.' });
//   }
// });

app.post('/orders', async (req, res) => {
  try {
    const { name, items, totalPrice, orderDate } = req.body;

    if (!name || !items || items.length === 0 || !totalPrice) {
      return res.status(400).json({ message: 'Namn, varor och totalpris krävs.' });
    }

    const newOrder = new Order({ name, items, totalPrice, orderDate });

    for (const item of items) {
      console.log('Bearbetar artikel:', item.name);

      for (const ingredient of item.ingredients) {
        console.log('Bearbetar ingrediens:', ingredient);

        // Case-insensitive sökning efter ingrediens i lager
        const stockItem = await Stock.findOne({ name: { $regex: new RegExp(`^${ingredient}$`, "i") } });

        if (!stockItem) {
          console.log(`Ingrediensen ${ingredient} hittades inte i lager.`);
          return res.status(404).json({
            message: `Ingrediensen ${ingredient} finns inte i lager.`,
          });
        }

        stockItem.quantity -= 1;

        if (stockItem.quantity < 0) {
          return res.status(400).json({
            message: `Lagermängden för ${ingredient} är slut.`,
          });
        }

        await stockItem.save();
        console.log(`Efter uppdatering: ${ingredient} har ${stockItem.quantity} i lager`);
      }
    }

    const savedOrder = await newOrder.save();
    res.status(201).json({ message: 'Order skapad och lager uppdaterat!', order: savedOrder });
  } catch (err) {
    console.error('Fel vid skapandet av order eller uppdatering av lager:', err);
    res.status(500).json({ message: 'Något gick fel vid skapandet av beställningen.' });
  }
});





//Orderhistorik


// Lägg till en ny beställning till orderhistorik
app.get("/orderhistory/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const orderHistory = await OrderHistory.findOne({ userId });

    if (!orderHistory) {
      return res.status(404).json({ message: "Ingen orderhistorik hittades för denna användare." });
    }

    res.status(200).json(orderHistory);
  } catch (err) {
    console.error("Fel vid hämtning av orderhistorik:", err);
    res.status(500).json({ message: "Ett fel inträffade vid hämtning av orderhistorik." });
  }
});


app.post("/orderhistory", async (req, res) => {
  try {
    const { userId, name, items, totalPrice } = req.body;

    // Kontrollera att alla fält finns
    if (!userId || !name || !items || items.length === 0 || !totalPrice) {
      return res.status(400).json({ message: "Alla obligatoriska fält måste fyllas i." });
    }

    // Hämta användarens orderhistorik eller skapa en ny
    let orderHistory = await OrderHistory.findOne({ userId });

    if (!orderHistory) {
      orderHistory = new OrderHistory({ userId, orders: [] });
    }

    // Lägg till den nya ordern
    orderHistory.orders.push({
      name,
      items,
      totalPrice,
      orderDate: new Date(),
    });

    // Spara ändringar
    await orderHistory.save();

    res.status(201).json({ message: "Beställningen har lagts till i orderhistorik!", orderHistory });
  } catch (err) {
    console.error("Fel vid sparandet av orderhistorik:", err);
    res.status(500).json({ message: "Ett fel inträffade vid sparandet av orderhistorik." });
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


//Middleware
app.use((req, res) => {
  res.status(404).json({ message: `Cannot ${req.method} ${req.path}` });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
