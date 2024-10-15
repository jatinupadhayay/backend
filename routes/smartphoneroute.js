// routes.js
const express = require("express");
const { getProductsByCategory } = require("../controllers/Smartcontroller");
const { searchProduct } = require("../controllers/productController");

const router = express.Router();

// Define the route for fetching products by category
router.get("/category/:categoryName", getProductsByCategory);

// search
router.get("/:regex", searchProduct);

module.exports = router;
