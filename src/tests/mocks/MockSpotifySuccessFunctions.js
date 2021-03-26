class MockSpotifySuccessFunctions {
  createAndSavePlaylist = async (playlist, title) => {
    return Promise.resolve(playlist);
  };

  getRedirectUrl = () => {};
}

export default MockSpotifySuccessFunctions;
