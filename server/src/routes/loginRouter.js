import { Router } from "express"
import { loginUser } from "../controller/loginController.js"

const router = Router()

// POST login
router.post("/", loginUser)

export default router