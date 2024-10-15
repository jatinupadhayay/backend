const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

// CORS options
const corsOptions = require("./config/corsOptions");
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", require("./routes/root"));
app.use("/users", require("./routes/userRoute"));
app.use("/auth", require("./routes/authRoute"));
app.use("/carousel", require("./routes/carouselRoute"));
app.use("/wishlist", require("./routes/wishlist"));
app.use("/products", require("./routes/smartphoneroute")); 



// Handle 404 for undefined routes
app.use("*", (req, res) => {
  res.status(404).json({ message: "Not found" });
});

// Server listening on port 8000
app.listen(8000, () => {
  console.log("Server running on port 8000");
});
