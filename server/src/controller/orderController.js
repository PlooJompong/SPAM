import mongoose from 'mongoose';
import Order from "../models/ordersModel.js";
import Stock from "../models/stockStatusModel.js";
import OrderHistory from "../models/orderHistoryModel.js";

// GET orders
const getOrders = async (req, res) => {
  try {
    const order = await Order.find();
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json(err);
  }
}

// GET order by id
const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json(err);
  }
}

// POST new order
const createOrder = async (req, res) => {
  try {
    const { name, items, totalPrice, orderDate, quantity, } = req.body;

    if (!name || !items || items.length === 0 || !totalPrice) {
      return res.status(400).json({ message: 'Namn, varor och totalpris krävs.' });
    }

    const newOrder = new Order({ name, items, totalPrice, orderDate, quantity, comment: req.body.comment || "", locked: req.body.locked ?? false, done: req.body.done ?? false });


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

    let orderHistory = await OrderHistory.findOne({ name });

    if (!orderHistory) {
      orderHistory = new OrderHistory({ name, orders: [] });
    }

    orderHistory.orders.push({
      name,
      items,
      totalPrice,
      orderDate: new Date(),
    })

    const savedOrder = await newOrder.save();
    const savedOrderHistory = await orderHistory.save();
    res.status(201).json({ message: 'Order skapad och lager uppdaterat!', order: savedOrder, orderHistory: savedOrderHistory });
  } catch (err) {
    console.error('Fel vid skapandet av order eller uppdatering av lager:', err);
    res.status(500).json({ message: 'Något gick fel vid skapandet av beställningen.' });
  }
};

// PUT update order by id
const updateOrder = async (req, res) => {
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
}

// DELETE order by id
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("Mottaget ID:", id);

    // Kontrollera att ID är giltigt
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log("Ogiltigt ID-format.");
      return res.status(400).json({ message: "Ogiltigt ID-format." });
    }

    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      console.log("Ingen order hittades för ID:", id);
      return res.status(404).json({ message: "Ordern hittades inte." });
    }

    console.log("Order raderad:", deletedOrder);
    res.status(200).json({ message: "Order raderad!", order: deletedOrder });
  } catch (err) {
    console.error("Fel vid borttagning av order:", err);
    res.status(500).json({ message: "Ett fel inträffade vid borttagning av order." });
  }
};

export { getOrders, getOrder, createOrder, updateOrder, deleteOrder }