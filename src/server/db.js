const lowdb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

let db;

/**
 * fn create connection database
 */
const createConnection = async () => {
  const adapter = new FileSync("db.json");
  db = lowdb(adapter);
  await db
    .defaults({
      tasks: [
        { title: "Primera tarea", description: "Debo crear una api rest." },
      ],
    })
    .write();

  // console.log("Database: ", db.get("tasks").value());
};

const getConnection = () => db;

const resetDatabase = () => getConnection().get("tasks").remove().write();

module.exports = { createConnection, getConnection, resetDatabase };
