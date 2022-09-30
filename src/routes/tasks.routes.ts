import { Router } from "express";
import { tasksController as controller } from "../controllers";
import { taskValidators, verifyToken } from "../middlewares";

const router = Router();

router.get("/", controller.getAll);
router.get("/count", controller.count);
router.get("/:id", controller.findByID);

router.delete("/:id", verifyToken, controller.remove);

router.post("/", [taskValidators.create, verifyToken], controller.create);

router.put("/:id", [taskValidators.update, verifyToken], controller.update);


export default router;
