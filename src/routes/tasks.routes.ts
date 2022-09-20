import { Router } from "express";
import * as controller from "../controllers/tasks.controllers";

const router = Router();

router.get("/", controller.getAll);
router.get("/count", controller.count);
router.get("/:id", controller.findByID);

router.delete("/:id", controller.remove);

router.post("/", controller.create);

router.put("/:id", controller.update);


export default router;
