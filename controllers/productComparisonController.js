const Product = require('../models/Product');
const ProductOffers = require('../models/ProductOffers');

// Fetch comparison data for a product
exports.compareProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    // Fetch product details
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Fetch offers from different platforms for the same product
    const offers = await ProductOffers.findByProductId(productId);

    // Combine product details and offers
    const responseData = {
      product: {
        name: product.name,
        description: product.description,
        images: product.images,
        features: product.features
      },
      offers: offers.map(offer => ({
        platform: offer.platform_name,
        sellerPrice: offer.price,
        discountedPrice: offer.discountedPrice,
        platformLogo: offer.platform_logo,
        bestPrice: offer.bestPrice
      }))
    };

    // Send the response
    res.json(responseData);
  } catch (error) {
    console.error('Error fetching product comparison:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
