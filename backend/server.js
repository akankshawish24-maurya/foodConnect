// const express = require('express');
// const cors = require('cors');
// const app = express();

// // Enable CORS for frontend running on localhost:5173
// app.use(cors({
//   origin: 'http://localhost:5173',
//   credentials: true
// }));

// app.use(express.json());

// const dns = require("dns");

// dns.setServers(["8.8.8.8"]);


// const dotenv = require("dotenv");

// dotenv.config();

// const connectDB = require("./config/db");
// const authRoutes = require("./routes/authRoutes");
// const foodRoutes = require("./routes/foodRoutes");
// app.use("/api/food", foodRoutes);

// // Middleware
// app.use(express.json());

// // Connect MongoDB
// connectDB();

// // Authentication routes
// app.use("/api/auth", authRoutes);
// const userRoutes = require("./routes/userRoutes");
// app.use("/api/users", userRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);

// // Test route
// app.get("/", (req, res) => {
//   res.send("FoodConnect Backend is Running!");
// });

// // Start server
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
const dns = require("dns");

dns.setServers(["8.8.8.8"]);

const express = require("express");

const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();


const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const foodRoutes = require("./routes/foodRoutes");
const claimRoutes = require("./routes/claimRoutes");
const pickupRoutes = require("./routes/pickupRoutes");
const adminRoutes = require("./routes/adminRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const demandRoutes = require("./routes/demandRoutes");


const app = express();
app.use(cors());
app.use(express.json());



connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/claims", claimRoutes);
app.use("/api/pickups", pickupRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/demand", demandRoutes);

app.get("/", (req, res) => {
  res.send("FoodConnect Backend is Running!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});