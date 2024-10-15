const wishdata = require("../models/Wishlist");
const getWishlistProductsbyuser_id = async (req, res) => {
  const { user_id } = req.params;
  try {
    const products =  await wishdata.getWishlistProducts(user_id);
    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found for this wishlist." });
    }

    return res.status(200).json(products); // Return the products as JSON
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const addWishlistProduct = async (req, res) => {
  const {desired_price,user_id,product_id} = req.body;

  // Check if all required fields are provided
  if (!desired_price||!user_id || !product_id  ) {
    return res.status(400).json({ message: "Missing required fields: user_id, product_id, or desired_price" });
  }

  try {
    // Call the function to add to wishlist
    await wishdata.addToWishlist(desired_price, user_id, product_id);
    return res.status(200).json({ message: "Successfully Added to Wishlist" });
  } catch (error) {
    console.error("Error adding product to wishlist:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
const deletewishlistproduct =async (req,res)=>{
  const {user_id,product_id}= req.body;
  if (!user_id || !product_id  ) {
    return res.status(400).json({ message: "Missing required fields: user_id, product_id, or desired_price" });
  }
  try {
    // Call the function to delete to wishlist
    await wishdata.deleteproduct( user_id, product_id);
    return res.status(200).json({ message: "Successfully delete to Wishlist" });
  } catch (error) {
    console.error("Error adding product to wishlist:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getWishlistProductsbyuser_id, addWishlistProduct,deletewishlistproduct };
