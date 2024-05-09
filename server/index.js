const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const errorHandler = require("./middleware/errorhandler");

// Database connection
const connectDb = async () => {
  try {
    const connect = await mongoose.connect(
      "mongodb+srv://admin:admin123@cluster0.n7xxrpc.mongodb.net/AtticaPanMasalaBackend?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Database connected:", connect.connection.host, connect.connection.name);
  } catch (err) {
    console.error("Database connection error:", err);
    process.exit(1); // Exit with error code
  }
};

// Initialize database connection
connectDb();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse incoming JSON requests

// Routes
app.use("/api/contacts", require("./routes/contactRouters"));
app.use("/api/administrators", require("./routes/administratorRoutes"));
app.use("/api/panshopadmin", require("./routes/panShopadminRoutes"));
app.use("/api/forgetPassword", require("./routes/authRoutes"));
app.use("/api/resetPassword", require("./routes/authRoutes"));
app.use("/api/panShopOwner", require("./routes/panShopOwnerRoutes"));

// SuperStockist Routes
app.use("/api/superstockist", require("./routes/superStockistSignupRoutes"));
app.use("/api/superStockistDetails", require("./routes/superStockistDetailsRoutes"));
app.use("/api/superStockistProductDetails", require("./routes/superStockistProductDetailsRoutes"));

// Error handling middleware
app.use(errorHandler);

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
