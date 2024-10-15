const router = require('express').Router();

router.get('/', (req, res) => {
    res.json("Welcome to this API")
})

module.exports = router;