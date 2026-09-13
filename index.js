require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db/connect");
const productRoutes = require("./routes/product");
const userRoutes = require("./routes/users");

const app = express();
const port = process.env.PORT || 5000;

// CORS configuration (yeh khud options/preflight handle kar leta hai)
app.use(cors({
  origin: ["https://full-stack-frontent.vercel.app", "http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(express.json());

// Routes
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/users", userRoutes);

// Root route added
app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "Backend API is running successfully!" });
});

app.get("/health", (req, res) => {
  res.status(200).json({ success: true, message: "Server is healthy" });
});

connectDB();

if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}
module.exports = app;