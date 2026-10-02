const express = require("express");
const {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus
} = require("../controllers/orderController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authMiddleware);
router.post("/", createOrder);
router.get("/me", getMyOrders);
router.get("/all", getAllOrders);
router.patch("/:id/status", updateOrderStatus);

module.exports = router;
