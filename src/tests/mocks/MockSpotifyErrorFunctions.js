class MockSpotifyErrorFunctions {
  createAndSavePlaylist = async (playlist, title) => {
    return Promise.reject({ message: 'Could not get the username.' });
  }
}

export default MockSpotifyErrorFunctions;