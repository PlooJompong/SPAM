import { Router } from "express";
import { getStock } from "../controller/stockController.js"
import verifyToken from "../middlewares/verifyToken.js";

const router = Router();

// GET stock
router.get("/", verifyToken, getStock)

export default router;