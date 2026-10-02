const { readProducts } = require("../utils/productStore");
const { readOrders, writeOrders, getNextId } = require("../utils/orderStore");

function createOrder(req, res) {
  const { items } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: "At least one order item is required" });
  }

  const products = readProducts();
  const normalizedItems = items.map((item) => {
    const product = products.find((entry) => entry.id === Number(item.productId));

    if (!product) {
      throw new Error(`Product ${item.productId} not found`);
    }

    const quantity = Number(item.quantity);

    if (!quantity || quantity <= 0) {
      throw new Error(`Invalid quantity for product ${item.productId}`);
    }

    return {
      productId: product.id,
      name: product.name,
      quantity,
      price: product.price,
      subtotal: product.price * quantity
    };
  });

  try {
    const total = normalizedItems.reduce((sum, item) => sum + item.subtotal, 0);
    const orders = readOrders();
    const newOrder = {
      id: getNextId(orders),
      userId: req.user.id,
      items: normalizedItems,
      total,
      status: "pending",
      createdAt: new Date().toISOString()
    };

    orders.push(newOrder);
    writeOrders(orders);

    return res.status(201).json(newOrder);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

function getMyOrders(req, res) {
  const orders = readOrders();
  const userOrders = orders.filter((order) => order.userId === req.user.id);
  return res.json(userOrders);
}

function getAllOrders(req, res) {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  const orders = readOrders();
  return res.json(orders);
}

function updateOrderStatus(req, res) {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  const id = Number(req.params.id);
  const { status } = req.body;
  const validStatuses = ["pending", "processing", "shipped", "delivered", "cancelled"];

  if (!status || !validStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid order status" });
  }

  const orders = readOrders();
  const orderIndex = orders.findIndex((order) => order.id === id);

  if (orderIndex === -1) {
    return res.status(404).json({ message: "Order not found" });
  }

  orders[orderIndex].status = status;
  writeOrders(orders);

  return res.json(orders[orderIndex]);
}

module.exports = {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus
};
