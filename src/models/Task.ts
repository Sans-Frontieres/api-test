import { v4 } from "uuid";
import { getConnection } from "../server/database";

export const all = async () => {
  const tasks = await getConnection().get("tasks").value();
  return { tasks, count: tasks.length };
};

export const count = async () => {
  const tasks = await getConnection().get("tasks").value();
  return tasks.length;
};

export const findByID = async (id: string) => {
  const task = await getConnection().get("tasks").find({ id }).value();
  return task;
};

export const create = async (title: string, description: string) => {
  const newTask = {
    id: v4(),
    title,
    description,
  };
  const db = await getConnection();
  await db.get("tasks").push(newTask).write();

  return newTask.id;
};

export const update = async (id: string, title: string, description: string) => {
  const db = await getConnection();
  const task = await db.get("tasks").find({ id }).value();

  if (!task) return;

  await db.get("tasks").find({ id }).assign({ title, description }).write();

  return id;
};

export const remove = async (id: string) => {
  const db = await getConnection();

  const task = await db.get("tasks").find({ id }).value();

  if (!task) return;

  await db.get("tasks").remove({ id }).write();

  return id;
};
