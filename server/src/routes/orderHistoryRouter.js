import { Router } from "express"
import { getOrderHistoryByUserId } from "../controller/orderHistoryController.js"
import verifyToken from "../middlewares/verifyToken.js"

const router = Router()

// GET orderhistory by userId
router.get("/:id", verifyToken, getOrderHistoryByUserId)

export default router