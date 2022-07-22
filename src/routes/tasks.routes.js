const { Router } = require("express");
const controller = require("../controllers/tasks.controllers");

const router = Router();

router.get("/", controller.findAll);

module.exports = router;

/**
 * get all tasks
 * get find by ID
 * get count
 * post create
 * put:id uptdate tasks
 * delete:id task
 */
