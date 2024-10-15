const productModel = require("../models/smartphone"); // Import the correct model

const getProductsByCategory = async (req, res) => {
  const { categoryName } = req.params; // Get category name from URL parameters
  try {
    const products = await productModel.selectProductsByCategory(categoryName); // Call model function to get products
    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found for this category." });
    }
    return res.status(200).json(products); // Return the products as JSON
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getProductsByCategory };
