const Product = require("../models/Products");

const searchProduct = async (req, res) => {
  const { regex } = req.params;
  const data = await Product.selectByName(regex);
  if (!data) return res.status(400).json({ message: "No Product Found" });
  res.status(200).send(data);
};

module.exports = { searchProduct };
