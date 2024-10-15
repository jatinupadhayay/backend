const express = require('express');
const router = express.Router();
const { scrapeCarouselImages } = require('../controllers/carouselcontroler');

// Route to scrape carousel images
router.get('/', async (req, res) => {
    try {
        const images = await scrapeCarouselImages();
        if (!images.length) {
            return res.status(404).json({ message: "No images found" });
        }
        res.json(images);
    } catch (error) {
        console.error("Server error:", error.message); // Log the error
        res.status(500).json({ message: "Error scraping images", error: error.message });
    }
});

module.exports = router;
