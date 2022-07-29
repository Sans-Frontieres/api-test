/**
 * Controller de tareas
 */
const { getConnection } = require("../server/db");

const getAll = async (__, res) => {
  const tasks = await getConnection().get("tasks").value();
  res.json({ tasks, count: tasks?.length });
};

module.exports = { getAll };
