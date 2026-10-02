require("dotenv").config();

const path = require("path");
const express = require("express");
const productRoutes = require("./src/routes/productRoutes");
const authRoutes = require("./src/routes/authRoutes");
const orderRoutes = require("./src/routes/orderRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  return next();
});

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "..")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/product-category", (req, res) => {
  res.sendFile(path.join(__dirname, "product-category.html"));
});

app.get("/product-category.html", (req, res) => {
  res.sendFile(path.join(__dirname, "product-category.html"));
});

app.get("/task-manager", (req, res) => {
  res.sendFile(path.join(__dirname, "task-manager.html"));
});

app.get("/task-manager.html", (req, res) => {
  res.sendFile(path.join(__dirname, "task-manager.html"));
});

app.get("/student-record", (req, res) => {
  res.sendFile(path.join(__dirname, "student-record.html"));
});

app.get("/student-record.html", (req, res) => {
  res.sendFile(path.join(__dirname, "student-record.html"));
});

app.get("/capstone-3-task-manager-to-do-app", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "capstone-3-task-manager-to-do-app", "index.html"));
});

app.get("/capstone-3-task-manager-to-do-app/index.html", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "capstone-3-task-manager-to-do-app", "index.html"));
});

app.get("/capstone-3-student-record-viewer-and-search-app", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "capstone-3-student-record-viewer-and-search-app", "index.html"));
});

app.get("/capstone-3-student-record-viewer-and-search-app/index.html", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "capstone-3-student-record-viewer-and-search-app", "index.html"));
});

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
