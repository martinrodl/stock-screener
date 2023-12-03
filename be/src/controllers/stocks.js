import Stock from "../models/stockModel.js";

export const getAllStocks = async (req, res) => {
  try {
    const stocks = await Stock.find({});
    res.json(stocks);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getStock = async (req, res) => {
  try {
    const { symbol } = req.query;
    const stock = await Stock.findOne({ symbol });
    res.json(stock);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
