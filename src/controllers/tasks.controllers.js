/**
 * Controller de tareas
 */
const { getConnection } = require("../db");

const findAll = async (req, res) => {
  const db = await getConnection().get("tasks").value();
  res.status(200).json({ data: db });
};

module.exports = { findAll };
