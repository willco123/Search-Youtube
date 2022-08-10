const express = require("express");
const router = express.Router();
const {
  GetAllFromTable,
  GetItemByIDFromTable,
  DeleteItemByIDFromTable,
} = require("../models/db");
const { SearchChannels } = require("../utils/IsSearchRequest");
const CheckForQuery = require("../utils/CheckForQuery");

router.get("/", async (req, res, next) => {
  try {
    query = req.query;
    var output;
    const isQuery =
      Object.keys(query).length != 0 || Object.values(query).length != 0;

    if (isQuery) {
      output = await SearchChannels(query);
    } else {
      output = await GetAllFromTable("channels");
    }
    return res.status(200).send(output);
  } catch (err) {
    if (err.code === "ER_BAD_FIELD_ERROR")
      return res.status(404).send("Incorrect column name");
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  //Returns JSON
  try {
    const id = req.params.id;
    const item = await GetItemByIDFromTable("channels", id);
    if (item === 0)
      return res
        .status(404)
        .send("A channel with that given id cannot be found");
    return res.status(200).send(item);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletedItem = await DeleteItemByIDFromTable("channels", id);
    if (deletedItem === 0)
      return res.status(404).send("A channel with the given ID was not found");

    return res.status(200).send("Record Successfully deleted");
  } catch (err) {
    next(err);
  }
});
module.exports = router;
