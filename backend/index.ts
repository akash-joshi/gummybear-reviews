import express from "express";

const app = express();
const cors = require("cors");

import { Server } from "socket.io";

const http = require("http");

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

import { JsonDB } from "node-json-db";
import { Config } from "node-json-db/dist/lib/JsonDBConfig";

type RatingObject = {
  rating: number;
  reviewText: string;
};

const db = new JsonDB(new Config("myDataBase", true, false, "/"));

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
  const { body } = req as any;

  if (!body.rating || !body.reviewText) {
    res.sendStatus(401);
  }

  let ratings = [];

  try {
    ratings = db.getData("/ratings");
  } catch (error) {
    console.error(error);
  }
  ratings.push(body);

  db.push("/ratings", ratings);

  io.emit("new rating", body);

  res.send(body);
});

io.on("connection", (socket) => {
  console.log("a user connected");
});

const PORT = 3001;

server.listen(PORT, () => {
  console.log(`The application is listening on port ${PORT}!`);
});
