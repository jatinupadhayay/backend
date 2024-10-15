const axios = require('axios');
const cheerio = require('cheerio');

// Scrape function for Amazon
const scrapeAmazon = async () => {
  try {
    const { data } = await axios.get('https://www.amazon.in/s?k=smartphones');
    const $ = cheerio.load(data);
    const products = [];

    // Example selector for Amazon (check and adjust as necessary)
    $('.s-main-slot .s-result-item').each((i, el) => {
      const name = $(el).find('h2 a span').text().trim();
      const price = $(el).find('.a-price-whole').text().trim();
      const rating = $(el).find('.a-icon-alt').text().trim();
      const brand = $(el).find('.a-size-base-plus').text().trim() || 'Unknown';
      const image = $(el).find('img').attr('src');
      const platformName = 'Amazon';

      if (name && price) {
        products.push({ name, price, rating, brand, platformName, image });
      }
    });

    return products;
  } catch (err) {
    console.error('Error scraping Amazon:', err);
    return [];
  }
};

// Scrape function for Flipkart
const scrapeFlipkart = async () => {
  try {
    const { data } = await axios.get('https://www.flipkart.com/search?q=smartphones');
    const $ = cheerio.load(data);
    const products = [];

    // Example selector for Flipkart (check and adjust as necessary)
    $('.col-12-12').each((i, el) => {
      const name = $(el).find('a.s1Q9rs').text().trim();
      const price = $(el).find('div._30jeq3').text().trim();
      const rating = $(el).find('.gUuXy-').text().trim();
      const brand = $(el).find('a.s1Q9rs').text().trim() || 'Unknown';
      const image = $(el).find('img._396cs4').attr('src');
      const platformName = 'Flipkart';

      if (name && price) {
        products.push({ name, price, rating, brand, platformName, image });
      }
    });

    return products;
  } catch (err) {
    console.error('Error scraping Flipkart:', err);
    return [];
  }
};

// Scrape function for Meesho
const scrapeMeesho = async () => {
  try {
    const { data } = await axios.get('https://www.meesho.com/search?q=smartphones');
    const $ = cheerio.load(data);
    const products = [];

    $('.sc-bqyKva').each((i, el) => {
      const name = $(el).find('.Text__StyledText-sc').text().trim();
      const price = $(el).find('.Text__StyledText-sc').last().text().trim();
      const rating = $(el).find('.Text__StyledText-sc').first().text().trim();
      const brand = 'Unknown'; // Meesho might not have a clear brand
      const image = $(el).find('img').attr('src');
      const platformName = 'Meesho';

      if (name && price) {
        products.push({ name, price, rating, brand, platformName, image });
      }
    });

    return products;
  } catch (err) {
    console.error('Error scraping Meesho:', err);
    return [];
  }
};

// Main controller to combine all scrape results
const scrapeAllPlatforms = async (req, res) => {
  try {
    const [amazonProducts, flipkartProducts, meeshoProducts] = await Promise.all([
      scrapeAmazon(),
      scrapeFlipkart(),
      scrapeMeesho(),
    ]);

    const allProducts = [...amazonProducts, ...flipkartProducts, ...meeshoProducts];
    res.json(allProducts);
  } catch (err) {
    console.error('Error fetching products:', err); // Added more detail to error logging
    res.status(500).json({ error: 'Error fetching products' });
  }
};

module.exports = { scrapeAllPlatforms };
