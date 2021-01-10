const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

//Get self top artisits
router.get("/artists", async (req, res) => {
  const accessToken = req.query.accessToken;
  console.log(accessToken);
  const headers = {
    Authorization: "Bearer " + accessToken,
  };
  let result = await fetch("https://api.spotify.com/v1/me/top/artists", {
    method: "GET",
    headers: headers,
  });
  console.log(result);
  const f = await result.json();
  res.json(f);
});

//Get self top tracks
router.get("/toptracks", async (req, res) => {
  const accessToken = req.query.accessToken;
  console.log(accessToken);
  const headers = {
    Authorization: "Bearer " + accessToken,
  };
  let result = await fetch("https://api.spotify.com/v1/me/top/tracks", {
    method: "GET",
    headers: headers,
  });
  console.log(result);
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

//Search query
router.get("/search", async (req, res) => {
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

router.get("/recommendations", async (req, res) => {
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

router.get("/newreleases", async (req, res) => {
  const accessToken = req.query.accessToken;

  console.log(req.query);
  const headers = {
    Authorization: "Bearer " + accessToken,
  };
  let result = await fetch(
    `https://api.spotify.com/v1/browse/new-releases?country=IN`,
    {
      method: "GET",
      headers: headers,
    }
  );
  const f = await result.json();
  res.json(f);
});

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
