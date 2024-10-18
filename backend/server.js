const express = require("express");
const logger = require("morgan");
const path = require("path");
const cors = require("cors");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
dotenv.config();

const app = express();
app.use(logger("dev"));
app.use(cors());
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
connectDB().catch((error) => {
  console.error(`MongoDB connection error: ${error.message}`);
  process.exit(1);
});

app.get("/", (req, res) => {
  res.status(200).json({
    message: "ok",
  });
});

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/post", postRoutes);

app.use((err, req, res, next) => {
  console.error(`Error: ${err.message}`);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Not Found",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
