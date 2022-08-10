import app from "./app.js";
import { createConnection } from "./db.js";

createConnection();

const server = app.listen(4000, () => {
  console.log("Server run on port 4000");
});

export default { app, server };
