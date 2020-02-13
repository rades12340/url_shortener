const express = require("express");
const db = require("./database/db");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));

db.sync()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

app.use("/", require("./routes/index"));

app.listen(process.env.PORT, () => {
  console.log(`Listening to http://localhost:${process.env.PORT}`);
});
