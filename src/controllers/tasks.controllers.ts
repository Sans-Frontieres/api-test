import { Handler } from "express";
import * as Task from "../model/Task";

export const getAll: Handler = async (__, res) => {
  const { tasks, count } = await Task.all();
  res.status(200).json({ tasks, count });
};

export const count: Handler = async (__, res) => {
  const count = await Task.count();
  res.json({ count });
};

export const findByID: Handler = async (req, res) => {
  const id = req.params.id;

  const task = await Task.findByID(id);

  if (!task) return res.status(404).json({ message: "Tarea no encontrada." });

  res.status(200).json(task);
};

export const create: Handler = async (req, res) => {
  const { title, description } = req.body;

  const id = await Task.create(title, description);

  res.status(201).json(id);
};

export const update: Handler = async (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;

  const idTask = await Task.update(id, title, description);

  if (!idTask)
    return res.status(404).json({ message: "La tarea no fue encontrada." });

  res.status(200).json({ id: idTask });
};

export const remove: Handler = async (req, res) => {
  const id = req.params.id;

  const idTask = await Task.remove(id);



  if (!idTask)
    return res.status(404).json({ message: "La tarea no fue encontrada." });

  res.status(202).json(idTask);
};
