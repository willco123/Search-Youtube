const express = require("express");
const router = express.Router();
const db = require("../config/db");
const { SearchChannels } = require("../helpers/IsSearchRequest");

router.get("/", async (req, res, next) => {
  try {
    query = req.query;
    var output;
    if (Object.keys(query).length != 0) {
      output = await SearchChannels(query);
    } else {
      [output] = await db.query("SELECT * from channels");
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
    const [rows] = await db.query("SELECT * from channels WHERE (id) = (?)", [
      req.params.id,
    ]);
    if (rows.length === 0)
      return res
        .status(404)
        .send("A channel with that given id cannot be found");
    return res.status(200).send(rows[0]);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletedItem = await db.query("DELETE FROM channels WHERE id = (?)", [
      id,
    ]);
    if (deletedItem[0].affectedRows === 0)
      return res.status(404).send("A channel with the given ID was not found");

    return res.status(200).send("Record Successfully deleted");
  } catch (err) {
    next(err);
  }
});
module.exports = router;
