const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");

const dataDir = path.join(__dirname, "..", "..", "data");
const dataFile = path.join(dataDir, "users.json");

function ensureDataFile() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  if (!fs.existsSync(dataFile)) {
    const adminUser = {
      id: 1,
      name: "Admin User",
      email: "admin@mstconnect.com",
      password: bcrypt.hashSync("admin123", 10),
      role: "admin"
    };

    fs.writeFileSync(dataFile, JSON.stringify([adminUser], null, 2), "utf8");
  }
}

function readUsers() {
  ensureDataFile();
  const raw = fs.readFileSync(dataFile, "utf8");
  return JSON.parse(raw);
}

function writeUsers(users) {
  fs.writeFileSync(dataFile, JSON.stringify(users, null, 2), "utf8");
}

function getNextId(users) {
  return users.length ? Math.max(...users.map((user) => user.id)) + 1 : 1;
}

module.exports = {
  readUsers,
  writeUsers,
  getNextId
};
