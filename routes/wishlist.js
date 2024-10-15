const router = require("express").Router();
const wishlistcontroller = require("../controllers/wishlistcontroller");

router.get("/:user_id", wishlistcontroller.getWishlistProductsbyuser_id);

router.post("/add", wishlistcontroller.addWishlistProduct);
router.delete("/delete",wishlistcontroller.deletewishlistproduct);

module.exports = router;
