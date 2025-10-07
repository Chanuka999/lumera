import express from "express";

const app = express();

app.get("/", () => {
  console.log("get request recieved");
});

app.post("/", () => {
  console.log("post request recieved");
});

app.listen(5000, () => {
  console.log("server is start");
});
