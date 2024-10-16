const express = require('express');
const router = express.Router();
const productComparisonController = require('../controllers/productComparisonController');


router.get('/compare/:productId', productComparisonController.compareProduct);

module.exports = router;
