import { Router } from "express"
import { getUsers, addNewUser } from "../controller/userController.js"

const router = Router()

// GET users
router.get("/", getUsers)

// POST new user
router.post("/", addNewUser)

export default router