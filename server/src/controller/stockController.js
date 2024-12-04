import Stock from "../models/stockStatusModel.js";

// GET stock
const getStock = async (req, res) => {
  try {
    const stock = await Stock.find();
    res.status(200).json(stock);
  } catch (err) {
    res.status(500).json(err);
  }
}

export { getStock }