const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./app");
dotenv.config({ path: "config.env" });
port_num = process.env.port_num;

app.listen(port_num, () => {
  console.log(
    `The server has started successfully on port ${process.env.port_num}`
  );
});

mongoose.connect(process.env.DB_URL).then((con) => {
  console.log(`Successfully connected with the database ✅✅✅`);
});
