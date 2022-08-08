const express = require("express");
const search = require("../routes/search");
const videos = require("../routes/videos");
const searchDB = require("../routes/searchDB");
const channels = require("../routes/channels");

module.exports = (app) => {
  app.use(express.json());
  app.use("/search", search);
  app.use("/videos", videos);
  app.use("/searchDB", searchDB);
  app.use("/channels", channels);
};
