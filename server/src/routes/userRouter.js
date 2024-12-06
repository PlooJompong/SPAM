import { Router } from "express"
import verifyToken from "../middlewares/verifyToken.js"
import { getUsers, addNewUser, loginUser } from "../controller/userController.js"

const router = Router()

// GET users
router.get("/", verifyToken, getUsers)

// POST new user
router.post("/", addNewUser)

// POST login
router.post("/login", loginUser)

export default router