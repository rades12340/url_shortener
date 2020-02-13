const express = require("express");
const router = express.Router();

const Url = require("../models/Url");

router.get("/:code", async (req, res) => {
  console.log("CODE", req.params.code);
  try {
    const url = await Url.findOne({ urlCode: req.params.code });
    console.log(url);
    if (url) {
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json("No url found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("Server error");
  }
});

module.exports = router;
