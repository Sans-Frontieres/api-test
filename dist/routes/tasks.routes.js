"use strict";

var _require = require("express"),
    Router = _require.Router;

var controller = require("../controllers/tasks.controllers");

var router = Router();
router.get("/", controller.getAll);
router.get("/count", controller.count);
router.get("/:id", controller.findByID);
router.post("/", controller.create);
router.put("/:id", controller.update);
router["delete"]("/:id", controller.remove);
module.exports = router;