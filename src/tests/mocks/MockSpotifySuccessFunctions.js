class MockSpotifySuccessFunctions {
  createAndSavePlaylist = async (playlist, title) => {
    return Promise.resolve(playlist);
  }
}

export default MockSpotifySuccessFunctions;