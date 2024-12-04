import { Router } from "express"
import { getOrderHistoryByUserId } from "../controller/orderHistoryController.js"

const router = Router()

// GET orderhistory by userId
router.get("/:id", getOrderHistoryByUserId)

export default router