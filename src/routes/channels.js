const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/", async (_req, res, next) => {
  //Get channels
  try {
    const [rows] = await db.query("SELECT * from channels");
    return res.status(200).send(rows);
  } catch (err) {
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
    var id = req.params.id;
    await db.query("DELETE FROM channels WHERE id = ?", [id]);
    res.status(200).send("Item deleted");
  } catch (err) {
    next(err);
  }
});
module.exports = router;
