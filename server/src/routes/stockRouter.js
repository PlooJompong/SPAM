import { Router } from "express";
import { getStock } from "../controller/stockController.js"

const router = Router();

// GET stock
router.get("/", getStock)

export default router;