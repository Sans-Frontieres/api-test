import { v4 } from "uuid";
import { getConnection } from "../server/db.js";

export const all = async () => {
  const tasks = await getConnection().get("tasks").value();
  return { tasks, count: tasks.length };
};
