import { Handler } from "express";
import { Task } from "../models";

export const getAll: Handler = async (__, res) => {
  try {
    const { tasks, count } = await Task.all();
    res.status(200).json({ tasks, count });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const count: Handler = async (__, res) => {
  try {
    const count = await Task.count();
    res.json({ count });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const findByID: Handler = async (req, res) => {
  try {
    const task = await Task.findByID(req.params.id);

    if (task) return res.json(task);

    res.status(404).json({ message: "No se encontro la tarea." });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const create: Handler = async (req, res) => {
  try {
    const idUser = req.params.idUser

    delete req.params.idUser

    const { title, description } = req.body;

    const id = await Task.create(title, description, idUser);

    res.status(201).json({ id, idUser });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const update: Handler = async (req, res) => {
  try {
    const idUser = req.params.idUser
    delete req.params.idUser

    const { title, description } = req.body;

    const id = await Task.update(req.params.id, title, description);

    if (id) return res.json({ id, idUser });

    res.status(404).json({ message: "No se encontro la tarea." });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const remove: Handler = async (req, res) => {
  try {
    const idUser = req.params.idUser
    delete req.params.idUser

    const id = await Task.remove(req.params.id);

    if (id) return res.status(202).json({ id, idUser });

    res.status(404).json({ message: "No se encontro la tarea." });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
