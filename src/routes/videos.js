const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/", async (_req, res, next) => {
  //Returns array
  try {
    const [rows] = await db.query("SELECT * from videos");
    return res.status(200).send(rows);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  //Returns JSON
  try {
    const [rows] = await db.query("SELECT * from videos WHERE (id) = (?)", [
      req.params.id,
    ]);
    if (rows.length === 0)
      return res.status(404).send("A video with that given id cannot be found");
    return res.status(200).send(rows[0]);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletedItem = await db.query("DELETE FROM videos WHERE id = (?)", [
      id,
    ]);
    if (deletedItem[0].affectedRows === 0)
      return res.status(404).send("A video with the given ID was not found");

    return res.status(200).send("Record Successfully deleted");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
