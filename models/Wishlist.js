const client = require("../config/db");

const addToWishlist = async (desired_price, userId, productId) => {
  try {
    await client.query(`
      INSERT INTO Customer_Wishlist (desired_price, user_id, product_id)
      VALUES ($1, $2, $3)
    `, [desired_price, userId, productId]); 
  } catch (err) {
    console.log(err.message);
    throw new Error("Database operation failed"); 
  }
};
const deleteproduct = async (product_id, user_id) => {
  try {
    await client.query(`
      DELETE FROM Customer_Wishlist 
      WHERE user_id = $1 AND product_id = $2
    `, [user_id, product_id]);
    
    return { message: "Successfully Deleted from Wishlist" };
  } catch (err) {
    console.error(err.message);
    throw new Error("Error deleting product from wishlist");
  }
};

const getWishlistProducts = async (user_id) => {
  const x = await client.query(
    `
   SELECT 
    p.product_id AS id,
    p.name AS product_name,
    po_flipkart.price AS flipkart_price,
    po_amazon.price AS amazon_price,
    cw.desired_price AS desired_price_range_min,
    (cw.desired_price + 40) AS desired_price_range_max, 
    p.image_url AS image
FROM 
    Customer_Wishlist cw
INNER JOIN 
    Product p ON cw.product_id = p.product_id
LEFT JOIN 
    Product_Offers po_flipkart ON p.product_id = po_flipkart.product_id
    AND po_flipkart.platform_id = (SELECT platform_id FROM Platform WHERE platform_name = 'Flipkart')
LEFT JOIN 
    Product_Offers po_amazon ON p.product_id = po_amazon.product_id
    AND po_amazon.platform_id = (SELECT platform_id FROM Platform WHERE platform_name = 'Amazon')
WHERE 
    cw.user_id = $1;

  `,
    [user_id]
  );
  return x.rows;
};

module.exports = {
  addToWishlist,
  getWishlistProducts,
  deleteproduct,
};
