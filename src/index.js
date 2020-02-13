const express = require("express");
const db = require("./database/db");
const app = express();
const PORT = process.env.PORT || 5000;

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
app.use("/api/url/", require("./routes/url"));

app.listen(process.env.PORT, () => {
  console.log(`Listening to http://localhost:${process.env.PORT}`);
});
