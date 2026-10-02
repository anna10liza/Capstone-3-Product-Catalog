const fs = require("fs");
const path = require("path");

const dataDir = path.join(__dirname, "..", "..", "data");
const dataFile = path.join(dataDir, "orders.json");

function ensureDataFile() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, JSON.stringify([], null, 2), "utf8");
  }
}

function readOrders() {
  ensureDataFile();
  const raw = fs.readFileSync(dataFile, "utf8");
  return JSON.parse(raw);
}

function writeOrders(orders) {
  fs.writeFileSync(dataFile, JSON.stringify(orders, null, 2), "utf8");
}

function getNextId(orders) {
  return orders.length ? Math.max(...orders.map((order) => order.id)) + 1 : 1;
}

module.exports = {
  readOrders,
  writeOrders,
  getNextId
};
