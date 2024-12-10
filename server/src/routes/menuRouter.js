import { Router } from "express";
import { getMenu, addNewMenuItem, updateMenuItem } from "../controller/menuController.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = Router();

// GET menu
router.get("/", getMenu)

// POST new menu item
router.post("/", verifyToken, addNewMenuItem)

// PUT update menu item
router.put("/:id", verifyToken, updateMenuItem)

export default router;