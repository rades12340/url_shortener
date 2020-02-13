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
      res.setHeader("Content-Type", "text/html");
      res.setHeader("Location", "www.google.com");
      res.writeHead(301, {
        "Content-Length": "0",
        "Content-Type": "text/plain"
      });
      res.end("Ok");
    } else {
      return res.status(404).json("No url found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("Server error");
  }
});

router.post("/shorten", async (req, res) => {
  const { url } = req.body;
  console.log(url);
  const baseUrl = process.env.BASE_URL;

  // Check base url
  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json("Invalid base url");
  }

  // Create url code
  const urlCode = shortid.generate();

  // Check long url
  if (validUrl.isUri(url)) {
    console.log("valid url");
    try {
      let uri = await Url.findOne({ where: { original_link: url } });

      if (uri) {
        res.json(ur);
      } else {
        const short_link = baseUrl + "/" + urlCode;

        uri = await Url.create({
          original_link: url,
          short_link,
          urlCode
        });

        res.json({
          original_link: uri.original_link,
          short_link: uri.short_link
        });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json("Server error");
    }
  } else {
    res.status(401).json("Invalid original url");
  }
});

module.exports = router;
