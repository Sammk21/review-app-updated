const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const reviewRoutes = require("./routes/reviewRoute");
const authRoutes = require("./routes/authRoutes");

const path = require("path");

const app = express();

app.use(cors());

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// app.use(cors());
app.use(express.json());

// Define Routes
app.use("/api/reviews", reviewRoutes);
app.use("/api/auth", authRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
