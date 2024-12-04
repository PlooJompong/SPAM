import OrderHistory from "../models/orderHistoryModel.js";

// GET orderhistory by name
const getOrderHistoryByUserId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Användar-ID krävs" });
    }

    const orderHistory = await OrderHistory.findOne({ name: id });

    if (!orderHistory) {
      return res.status(404).json({ message: "Ingen orderhistorik hittades för denna användare." });
    }

    res.status(200).json(orderHistory);

  } catch (err) {
    console.error("Fel vid hämtning av orderhistorik:", err);
    res.status(500).json({ message: "Ett fel inträffade vid hämtning av orderhistorik." });
  }
}

export { getOrderHistoryByUserId }