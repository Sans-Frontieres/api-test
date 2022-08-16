import "./config.js";
import app from "./app.js";
import { createConnection } from "./db.js";

createConnection();

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server is running at 
      PORT: ${process.env.PORT} 
        DB: ${process.env.DB_LOCAL_PATH}`
  );
});

export { app, server };
