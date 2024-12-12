import { Router } from "express";
import {
  getOrders,
  getOrder,
  createOrder,
  updateComment,
  deleteOrder,
  toggleLockOrder,
  toggleDoneOrder,
} from "../controller/orderController.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = Router();

// GET orders
router.get("/", verifyToken, getOrders);

// GET orders by id
router.get("/:id", verifyToken, getOrder);

// POST new order
router.post("/", verifyToken, createOrder);

// PUT update order comment by id
router.put("/:id/comment", verifyToken, updateComment);

// PUT lock order by id
router.put("/:id/toggle-lock", verifyToken, toggleLockOrder);

// PUT done order by id
router.put("/:id/toggle-done", verifyToken, toggleDoneOrder);

// DELETE order by id
router.delete("/:id", verifyToken, deleteOrder);

export default router;
