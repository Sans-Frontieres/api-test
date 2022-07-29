const app = require("./app");
const { createConnection } = require("./db");

createConnection();

app.listen(4000, () => {
  console.log("Server run on port 4000");
});
