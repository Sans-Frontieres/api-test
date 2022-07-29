const v4 = require("uuid").v4;
const { getConnection } = require("../server/db");

const getAll = async (__, res) => {
  const tasks = await getConnection().get("tasks").value();
  res.json({ tasks, count: tasks?.length });
};

const count = async (__, res) => {
  const tasks = await getConnection().get("tasks").value();
  res.json({ count: tasks?.length });
};

const findByID = async (req, res) => {
  const id = req.params.id;

  const task = await getConnection().get("tasks").find({ id }).value();

  if (!task) return res.status(404).json({ error: "Tarea no encontrada." });

  res.status(200).json(task);
};

const create = async (req, res) => {
  const { title, description } = req.body;

  const newTask = {
    id: v4(),
    title,
    description,
  };

  const db = await getConnection();
  await db.get("tasks").push(newTask).write();

  res.status(201).json(newTask.id);
};

module.exports = { getAll, create, count, findByID };
