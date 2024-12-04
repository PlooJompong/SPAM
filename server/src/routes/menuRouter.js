import { Router } from "express";
import { getMenu, addNewMenuItem, updateMenuItem } from "../controller/menuController.js";

const router = Router();

// GET menu
router.get("/", getMenu)

// POST new menu item
router.post("/", addNewMenuItem)

// PUT update menu item
router.put("/:id", updateMenuItem)

export default router;