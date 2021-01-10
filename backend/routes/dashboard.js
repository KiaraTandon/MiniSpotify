const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

//New releases
router.get("/newreleases", async (req, res) => {
  const accessToken = req.query.accessToken;
  const offset = req.query.offset;
  console.log(req.query);
  const headers = {
    Authorization: "Bearer " + accessToken,
  };
  let result = await fetch(
    `https://api.spotify.com/v1/browse/new-releases?country=IN&offset=${offset}`,
    {
      method: "GET",
      headers: headers,
    }
  );
  const f = await result.json();
  res.json(f);
});

//Get featured playlists
router.get("/featured", async (req, res) => {
  const accessToken = req.query.accessToken;
  console.log(req.query);
  const headers = {
    Authorization: "Bearer " + accessToken,
  };
  let result = await fetch(
    `https://api.spotify.com/v1/browse/featured-playlists`,
    {
      method: "GET",
      headers: headers,
    }
  );
  const f = await result.json();
  res.json(f);
});

//Get tracks from featured playlists
router.get("/playlist", async (req, res) => {
  const id = req.query.id;
  const accessToken = req.query.accessToken;
  console.log(req.query);
  const headers = {
    Authorization: "Bearer " + accessToken,
  };
  let result = await fetch(
    `https://api.spotify.com/v1/playlists/${id}/tracks`,
    {
      method: "GET",
      headers: headers,
    }
  );
  const f = await result.json();
  res.json(f);
});

module.exports = router;
