//Search query
const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

//Search query
//Search by albums and artisit
//Artist tracks shared with me.js
router.get("/searchquery", async (req, res) => {
  const q = req.query.q;
  const accessToken = req.query.accessToken;
  const type = req.query.type;

  console.log(req.query);
  const headers = {
    Authorization: "Bearer " + accessToken,
  };
  let result = await fetch(
    `https://api.spotify.com/v1/search?q=${q}&type=${type}`,
    {
      method: "GET",
      headers: headers,
    }
  );
  const f = await result.json();
  res.json(f);
});

//Get tracks from an album id
router.get("/albumtrack", async (req, res) => {
  const id = req.query.id;
  const accessToken = req.query.accessToken;
  console.log(req.query);
  const headers = {
    Authorization: "Bearer " + accessToken,
  };
  let result = await fetch(`https://api.spotify.com/v1/albums/${id}/tracks`, {
    method: "GET",
    headers: headers,
  });
  const f = await result.json();
  res.json(f);
});

module.exports = router;
