import { v4 } from "uuid";
import * as Task from "../model/Task.js";
import { getConnection } from "../server/db.js";

export const getAll = async (__, res) => {
  const tasks = await Task.all();
  res.json({ tasks, count: tasks?.length });
};

export const count = async (__, res) => {
  const tasks = await getConnection().get("tasks").value();
  res.json({ count: tasks?.length });
};

export const findByID = async (req, res) => {
  const id = req.params.id;

  const task = await getConnection().get("tasks").find({ id }).value();

  if (!task) return res.status(404).json({ message: "Tarea no encontrada." });

  res.status(200).json(task);
};

export const create = async (req, res) => {
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

export const update = async (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;

  const db = await getConnection();

  const task = await db.get("tasks").find({ id }).value();

  if (!task)
    return res.status(404).json({ message: "La tarea no fue encontrada." });

  await db.get("tasks").find({ id }).assign({ title, description }).write();

  res.status(200).json({ id });
};

export const remove = async (req, res) => {
  const id = req.params.id;
  const db = await getConnection();

  const task = await db.get("tasks").find({ id }).value();

  if (!task)
    return res.status(404).json({ message: "La tarea no fue encontrada." });

  await db.get("tasks").remove({ id }).write();

  res.status(202).json(id);
};
