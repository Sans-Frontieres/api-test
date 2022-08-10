import { getConnection } from "../server/db.js";

export const all = async () => {
  const tasks = await getConnection().get("tasks").value();
  return tasks;
};

export const count = async () => {};

export const finByID = async () => {};

export const create = async () => {};

export const update = async () => {};

export const remove = async () => {};
