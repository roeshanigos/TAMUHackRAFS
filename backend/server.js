const express = require("express");
const app = express();
const fs = require("fs");
const bp = require("body-parser");
const { main_airports } = require("./app");
const { main_flights } = require("./mockflight");

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.get("/airports/:lat1/:lng1/:lat2/:lng2", (req, res) => {
  const x1 = req.params.lat1;
  const y1 = req.params.lng1;
  const x2 = req.params.lat2;
  const y2 = req.params.lng2;
  console.log(x1, y1, x2, y2);
  const airports = main_airports(x1, y1, x2, y2);
  res.send(airports);
});

app.get("/flights/:lat/:lng/:code/:days", (req, res) => {
  const code = req.params.code;
  const x1 = req.params.lat;
  const y1 = req.params.lng;
  const days = req.params.days;
  const flights = main_flights(x1, y1, code, days);
  res.send(flights);
});

const PORT = 3005;
app.listen(PORT, console.log("Listening on PORT 3005"));
