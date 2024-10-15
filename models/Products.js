const client = require("../config/db");

const selectByName = async (name) => {
  const x = await client.query(
    `
    SELECT p.*, pl.platform_name,p.image_url,p.product_url
    FROM product p
    JOIN platform pl ON p.platform_id = pl.platform_id
    WHERE p.name ~* $1;
  `,
    [name]
  );

  return x.rows;
};

module.exports = { selectByName };
