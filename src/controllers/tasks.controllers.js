import * as Task from "../model/Task.js";

export const getAll = async (__, res) => {
  const { tasks, count } = await Task.all();
  res.json({ tasks, count });
};

export const count = async (__, res) => {
  const count = await Task.count();
  res.json({ count });
};

export const findByID = async (req, res) => {
  const id = req.params.id;

  const task = await Task.findByID(id);

  if (!task) return res.status(404).json({ message: "Tarea no encontrada." });

  res.status(200).json(task);
};

export const create = async (req, res) => {
  const { title, description } = req.body;

  const id = await Task.create(title, description);

  res.status(201).json(id);
};

export const update = async (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;

  const idTask = await Task.update(id, title, description);

  if (!idTask)
    return res.status(404).json({ message: "La tarea no fue encontrada." });

  res.status(200).json({ id: idTask });
};

export const remove = async (req, res) => {
  const id = req.params.id;

  const idTask = await Task.remove(id);

  if (!idTask)
    return res.status(404).json({ message: "La tarea no fue encontrada." });

  res.status(202).json(idTask);
};
