import express from "express";

const app = express();
var cors = require("cors");

import { JsonDB } from "node-json-db";
import { Config } from "node-json-db/dist/lib/JsonDBConfig";

// The first argument is the database filename. If no extension, '.json' is assumed and automatically added.
// The second argument is used to tell the DB to save after each push
// If you put false, you'll have to call the save() method.
// The third argument is to ask JsonDB to save the database in an human readable format. (default false)
// The last argument is the separator. By default it's slash (/)
var db = new JsonDB(new Config("myDataBase", true, false, "/"));

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.get("/data", async (req, res) => {
  let ratings = [];
  try {
    ratings = db.getData("/ratings");
  } catch (error) {
    console.error(error);
  }

  res.send(ratings);
});

app.post("/data", (req, res) => {
  let ratings = [];

  try {
    ratings = db.getData("/ratings");
  } catch (error) {
    console.error(error);
  }
  ratings.push(req.body);

  db.push("/ratings", ratings);

  res.send(req.body);
});

app.listen(3000, () => {
  console.log("The application is listening on port 3000!");
});
