import { Router } from "express";
import { tasksController as controller } from "../controllers";
import { taskValidators, verifyToken, hasPrivileges } from "../middlewares";

const router = Router();

router.get("/", controller.getAll);
router.get("/count", controller.count);
router.get("/:id", controller.findByID);

router.post("/", [taskValidators.create, verifyToken], controller.create);


router.put("/:id", [verifyToken, hasPrivileges, taskValidators.update], controller.update);

router.delete("/:id", [verifyToken, hasPrivileges], controller.remove);

export default router;
