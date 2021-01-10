const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

//Get self top artisits
router.get("/topartists", async (req, res) => {
  const accessToken = req.query.accessToken;
  console.log(accessToken);
  const headers = {
    Authorization: "Bearer " + accessToken,
  };
  let result = await fetch("https://api.spotify.com/v1/me/top/artists", {
    method: "GET",
    headers: headers,
  });
  // console.log(result);
  const f = await result.json();
  res.json(f);
});

//Get tracks from an artist ID
router.get("/tracks", async (req, res) => {
  const accessToken = req.query.accessToken;
  const artistId = req.query.artistId;
  console.log(artistId);
  const headers = {
    Authorization: "Bearer " + accessToken,
  };
  let result = await fetch(
    `https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=IN`,
    {
      method: "GET",
      headers: headers,
    }
  );
  const f = await result.json();
  res.json(f);
});

//Top tracks on Dashboard
router.get("/toptracks", async (req, res) => {
  const accessToken = req.query.accessToken;
  const offset = req.query.offset ? req.query.offset : 0;
  console.log(offset);
  const headers = {
    Authorization: "Bearer " + accessToken,
  };
  let result = await fetch(
    `https://api.spotify.com/v1/me/top/tracks?offset=${offset}`,
    {
      method: "GET",
      headers: headers,
    }
  );
  // console.log(result);
  const f = await result.json();
  res.json(f);
});

//Genre Feed
router.get("/genre", async (req, res) => {
  const accessToken = req.query.accessToken;
  const genre = req.query.genre;

  console.log(req.query);
  const headers = {
    Authorization: "Bearer " + accessToken,
  };
  let result = await fetch(
    `https://api.spotify.com/v1/recommendations?seed_genres=${genre}`,
    {
      method: "GET",
      headers: headers,
    }
  );
  const f = await result.json();
  res.json(f);
});

//Playlist page
router.get("/myplaylists", async (req, res) => {
  const accessToken = req.query.accessToken;

  console.log(req.query);
  const headers = {
    Authorization: "Bearer " + accessToken,
  };
  let result = await fetch(`https://api.spotify.com/v1/me/playlists`, {
    method: "GET",
    headers: headers,
  });
  const f = await result.json();
  res.json(f);
});

module.exports = router;
