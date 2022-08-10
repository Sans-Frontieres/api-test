import lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync.js";

let db;

/**
 * fn create connection database
 */
export const createConnection = async () => {
  const adapter = new FileSync("db.json");
  db = lowdb(adapter);
  await db
    .defaults({
      tasks: [],
    })
    .write();

  // console.log("Database: ", db.get("tasks").value());
};

export const getConnection = () => db;

export const resetDatabase = () =>
  getConnection().get("tasks").remove().write();
