const pool = require('../config/db'); 

// Function to fetch products by category
const selectProductsByCategory = async (categoryName) => {
    try {
        const result = await pool.query(`
            SELECT p.name, p.brand, p.image_url, p.description, po.price, po.offer_start_date, po.offer_end_date
            FROM product p
            JOIN product_category pc ON p.category_id = pc.category_id
            JOIN product_offers po ON p.product_id = po.product_id
            WHERE pc.category_name = $1;
        `, [categoryName]);
        return result.rows; // Return the products
    } catch (err) {
        console.error('Error fetching products by category:', err);
        throw err;
    }
};

module.exports = { selectProductsByCategory };
