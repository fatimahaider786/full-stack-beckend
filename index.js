// backend/index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db/connect");
const productRoutes = require("./routes/product");
const userRoutes = require("./routes/users");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: "*", 
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.options("*", cors());

app.use(express.json());

// Routes
app.use("/api/v1", productRoutes);
app.use("/api/v1/users", userRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ success: true, message: "Server is healthy" });
});

connectDB();

app.listen(port, () => {
  console.log(`Server is up and listening on port ${port}`);
});