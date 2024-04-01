const express = require("express");
const router = express.Router();

router.post("/foodData", (req, res) => {
  try {
    res.send([global.food_item,global.food_cat]);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
