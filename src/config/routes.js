const express = require("express");
const search = require("../routes/search");
const videos = require("../routes/videos");
const channels = require("../routes/channels");

module.exports = (app) => {
  app.use(express.json());
  app.use("/search", search);
  app.use("/videos", videos);
  app.use("/channels", channels);
};
