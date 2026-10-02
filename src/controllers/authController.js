const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { readUsers, writeUsers, getNextId } = require("../utils/userStore");

const JWT_SECRET = process.env.JWT_SECRET || "capstone-secret-key";

function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, name: user.name, role: user.role },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
}

function sanitizeUser(user) {
  const { password, ...safeUser } = user;
  return safeUser;
}

function registerUser(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "name, email, and password are required" });
  }

  const users = readUsers();
  const existingUser = users.find((user) => user.email.toLowerCase() === String(email).toLowerCase());

  if (existingUser) {
    return res.status(409).json({ message: "Email already registered" });
  }

  const newUser = {
    id: getNextId(users),
    name: String(name).trim(),
    email: String(email).trim().toLowerCase(),
    password: bcrypt.hashSync(String(password), 10),
    role: "customer"
  };

  users.push(newUser);
  writeUsers(users);

  const token = generateToken(newUser);

  return res.status(201).json({
    message: "User registered successfully",
    token,
    user: sanitizeUser(newUser)
  });
}

function loginUser(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "email and password are required" });
  }

  const users = readUsers();
  const user = users.find((entry) => entry.email.toLowerCase() === String(email).toLowerCase());

  if (!user || !bcrypt.compareSync(String(password), user.password)) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = generateToken(user);

  return res.json({
    message: "Login successful",
    token,
    user: sanitizeUser(user)
  });
}

function getCurrentUser(req, res) {
  return res.json({ user: req.user });
}

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser
};
