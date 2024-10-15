const puppeteer = require('puppeteer');

const scrapeCarouselImages = async () => {
    const url = 'https://www.flipkart.com/';

    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2' });

        // Close login pop-up if it appears
        try {
            await page.click('button._2KpZ6l._2doB4z');
        } catch (err) {
            console.log("No login pop-up");
        }

        // Wait for the carousel container to load
        await page.waitForSelector('.zlQd20', { timeout: 30 });

        // Scrape the images in the carousel section
        const carouselImages = await page.evaluate(() => {
            let images = [];
            document.querySelectorAll('.zlQd20 img').forEach(img => {
                let imageUrl = img.src; // Get the src attribute for image URL
                images.push({ imageUrl });
            });
            return images;
        });

        await browser.close();
        return carouselImages;
    } catch (error) {
        console.error("Error scraping images: ", error);
        throw error; // Ensure the error is propagated properly
    }
};

module.exports = { scrapeCarouselImages };
