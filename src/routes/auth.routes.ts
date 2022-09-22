import { Router } from "express";
import { authController as controller } from '../controllers';
import { authValidators } from "../middlewares";

const router = Router()

router.post("/signup", authValidators.signUp, controller.signup)
router.post("/login", authValidators.login, controller.login)

export default router