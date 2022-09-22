import { Router } from "express";
import * as controller from "../controllers/tasks.controllers";
import { taskValidators } from "../middlewares";

const router = Router();

router.get("/", controller.getAll);
router.get("/count", controller.count);
router.get("/:id", controller.findByID);

router.delete("/:id", controller.remove);

router.post("/", taskValidators.create, controller.create);

router.put("/:id", taskValidators.update, controller.update);


export default router;
