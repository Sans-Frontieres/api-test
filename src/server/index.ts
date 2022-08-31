import "./config";
import app from "./app";
import { createConnection } from "./db";

createConnection();

const listenServer = () => {
  app.listen(process.env.PORT, () => {
    console.log(
      `Server is running at
        PORT: ${process.env.PORT}
          DB: ${process.env.DB_LOCAL_PATH}`
    );
  });
};

if (process.env.NODE_ENV != "test") listenServer();

export default app;
