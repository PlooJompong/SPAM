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
};

// GET order by id
const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json(err);
  }
};

// POST new order
const createOrder = async (req, res) => {
  try {
    const { name, items, totalPrice, orderDate, quantity, comment } = req.body;

    if (!name || !items || items.length === 0 || !totalPrice) {
      return res
        .status(400)
        .json({ message: "Namn, varor och totalpris krävs." });
    }

    const newOrder = new Order({
      name,
      items,
      totalPrice,
      orderDate,
      quantity,
      comment: req.body.comment || "",
      locked: req.body.locked ?? false,
      done: req.body.done ?? false,
    });

    for (const item of items) {
      console.log("Bearbetar artikel:", item.name);

      for (const ingredient of item.ingredients) {
        console.log("Bearbetar ingrediens:", ingredient);

        // Case-insensitive search for ingredient in stock
        const stockItem = await Stock.findOne({
          name: { $regex: new RegExp(`^${ingredient}$`, "i") },
        });

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
        console.log(
          `Efter uppdatering: ${ingredient} har ${stockItem.quantity} i lager`
        );
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
      comment: comment || "",
    });

    const savedOrder = await newOrder.save();
    const savedOrderHistory = await orderHistory.save();
    res.status(201).json({
      message: "Order skapad och lager uppdaterat!",
      order: savedOrder,
      orderHistory: savedOrderHistory,
    });
  } catch (err) {
    console.error(
      "Fel vid skapandet av order eller uppdatering av lager:",
      err
    );
    res
      .status(500)
      .json({ message: "Något gick fel vid skapandet av beställningen." });
  }
};

const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: "Ordern hittades inte." });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { comment },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Order kommentar uppdaterad!", order: updatedOrder });
  } catch (err) {
    console.error("Fel vid uppdatering av order kommentar:", err);
    res.status(500).json({
      message: "Ett fel inträffade vid uppdatering av order kommentar.",
    });
  }
};

const toggleLockOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: "Ordern hittades inte." });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { locked: !order.locked },
      { new: true }
    );

    res.status(200).json({
      message: `Order ${updatedOrder.locked ? "låst" : "upplåst"}!`,
      order: updatedOrder,
    });
  } catch (err) {
    console.error("Fel vid alternering av order lock-status:", err);
    res
      .status(500)
      .json({ message: "Ett fel inträffade vid uppdatering av order." });
  }
};

const toggleDoneOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: "Ordern hittades inte." });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { done: !order.done },
      { new: true }
    );

    res.status(200).json({
      message: `Order ${updatedOrder.done ? "inteKlar" : "Klar"}!`,
      order: updatedOrder,
    });
  } catch (err) {
    console.error("Fel vid alternering av order done-status:", err);
    res
      .status(500)
      .json({ message: "Ett fel inträffade vid uppdatering av order." });
  }
};

// DELETE order by id
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      console.log("Ingen order hittades för ID:", id);
      return res.status(404).json({ message: "Ordern hittades inte." });
    }

    res.status(200).json({ message: "Order raderad!", order: deletedOrder });
  } catch (err) {
    console.error("Fel vid borttagning av order:", err);
    res
      .status(500)
      .json({ message: "Ett fel inträffade vid borttagning av order." });
  }
};

export {
  getOrders,
  getOrder,
  createOrder,
  updateComment,
  deleteOrder,
  toggleLockOrder,
  toggleDoneOrder,
};
