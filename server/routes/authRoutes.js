import {Router} from "express";
import {login, register, logout, me} from "../controllers/authControllers.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const authRouter = Router();

authRouter.post('/register', register)
authRouter.post('/login', login)
authRouter.post('/logout', logout)
authRouter.post('/me', authMiddleware, me)

export default authRouter;