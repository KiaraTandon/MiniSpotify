handleScriptLoad = () => {
  return new Promise((resolve) => {
    if (window.Spotify) {
      resolve();
    } else {
      window.onSpotifyWebPlaybackSDKReady = resolve;
    }
  });
};

this.handleScriptLoad();
