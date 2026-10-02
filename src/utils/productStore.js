const fs = require("fs");
const path = require("path");

const dataDir = path.join(__dirname, "..", "..", "data");
const dataFile = path.join(dataDir, "products.json");

const seedProducts = [
  { id: 1, name: "Mechanical Keyboard", price: 2200, category: "Accessories" },
  { id: 2, name: "Wireless Mouse", price: 850, category: "Accessories" },
  { id: 3, name: "Monitor", price: 7000, category: "Displays" }
];

function ensureDataFile() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, JSON.stringify(seedProducts, null, 2), "utf8");
  }
}

function readProducts() {
  ensureDataFile();

  const raw = fs.readFileSync(dataFile, "utf8");
  return JSON.parse(raw);
}

function writeProducts(products) {
  fs.writeFileSync(dataFile, JSON.stringify(products, null, 2), "utf8");
}

function getNextId(products) {
  return products.length ? Math.max(...products.map((item) => item.id)) + 1 : 1;
}

module.exports = {
  readProducts,
  writeProducts,
  getNextId,
  dataFile
};
