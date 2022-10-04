import app from "./app";
import seed from '../seed'

app.listen(process.env.PORT, () => {
  seed()
  console.log(
    `Server is running at
      PORT: ${process.env.PORT}
        DB: ${process.env.DB_LOCAL_PATH}`
  );
});

