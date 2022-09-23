import { Router } from "express";
import { authController as controller } from '../controllers';
import { authValidators, uniqueEmail } from "../middlewares";

const router = Router()

router.post("/signup", [authValidators.signUp, uniqueEmail], controller.signUp)
router.post("/login", authValidators.login, controller.login)

export default router