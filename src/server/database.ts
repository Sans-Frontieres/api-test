import lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import { TaskProps, UserProps } from "../interfaces/types";

type Schema = {
  users: UserProps[],
  tasks: TaskProps[]
}

let db: lowdb.LowdbSync<Schema>;

export async function createConnection() {
  const adapter = new FileSync<Schema>(`${process.env.DB_LOCAL_PATH}`);
  db = lowdb(adapter);
  db.defaults({ users: [], tasks: [] }).write();
}

export const getConnection = () => db;



export const resetDatabase = async () => {
  await getConnection().get('users').remove().write();
  await getConnection().get('tasks').remove().write();
};