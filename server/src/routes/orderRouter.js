import { Router } from "express";
import { getOrders, getOrder, createOrder, updateOrder, deleteOrder, toggleLockOrder, toggleDoneOrder } from "../controller/orderController.js";

const router = Router();

// GET orders
router.get("/", getOrders)

// GET orders by id
router.get("/:id", getOrder)

// POST new order
router.post("/", createOrder)

// UPDATE order by id
router.put("/:id", updateOrder)

//PUST lock order by id
router.put("/:id/toggle-lock", toggleLockOrder); 

//PUT done order by id
router.put("/:id/toggle-done", toggleDoneOrder);

// DELETE order by id
router.delete("/:id", deleteOrder)

export default router;