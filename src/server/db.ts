import lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync";

type Task = {
  id: string,
  title: string,
  description: string
}

type Schema = {
  tasks: Task[]
}

let db: lowdb.LowdbSync<Schema>

export const createConnection = async () => {
  const adapter = new FileSync<Schema>(`${process.env.DB_LOCAL_PATH}`);
  db = lowdb(adapter);
  await db.defaults({ tasks: [] }).write();
};

export const getConnection = () => db;

export const resetDatabase = () =>
  getConnection().get("tasks").remove().write();
