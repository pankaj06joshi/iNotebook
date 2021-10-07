const connectToMongo = require("./db");
var cors = require("cors");
const express = require("express");

connectToMongo();
const app = express();
app.use(cors());
const port = 5000;

app.use(express.json());
// Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
