const express = require("express");
const validUrl = require("valid-url");
const shortid = require("shortid");
const router = express.Router();

const Url = require("../models/Url");

router.get("/:code", async (req, res) => {
  try {
    const url = await Url.findOne({ where: { urlCode: req.params.code } });
    console.log(url);
    if (url) {
      return res.redirect(url.original_link);
    } else {
      return res.status(404).json("No url found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("Server error");
  }
});

router.post("/shorten", async (req, res) => {
  const { original_link } = req.body;
  const baseUrl = process.env.BASE_URL;

  // Check base url
  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json("Invalid base url");
  }

  // Create url code
  const urlCode = shortid.generate();

  // Check long url
  if (validUrl.isUri(original_link)) {
    try {
      let url = await Url.findOne({ where: { original_link } });

      if (url) {
        res.json(url);
      } else {
        const short_link = baseUrl + "/" + urlCode;

        url = new Url({
          original_link,
          short_link,
          urlCode
        });

        await url.save();

        res.json({
          original_link: url.original_link,
          short_link: url.short_link
        });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json("Server error");
    }
  } else {
    res.status(401).json("Invalid long url");
  }
});

module.exports = router;
