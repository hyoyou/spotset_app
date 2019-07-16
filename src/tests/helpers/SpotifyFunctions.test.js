/* eslint-disable no-undef */
import axios from 'axios';
import PromiseFactory from '../testHelpers/PromiseFactory';
import SpotifyFunctions from '../../helpers/SpotifyFunctions';

jest.mock('axios');

describe('Spotify Helper Functions', () => {
  it('gets the Spotify username of logged in user', async (done) => {
    const promise = PromiseFactory.createResolve({ data: { id: 'testId' } });
    const httpClient = axios;
    const spotifyFunctions = new SpotifyFunctions(httpClient);

    httpClient.get.mockReturnValue(promise);

    const result = await spotifyFunctions.getUsername();

    expect(result).toEqual('testId');
    done();
  });

  it('returns error if there is an error grabbing Spotify userId of logged in user', async (done) => {
    const promise = PromiseFactory.createReject({ data: { message: 'user not found' } });
    const httpClient = axios;
    const spotifyFunctions = new SpotifyFunctions(httpClient);

    httpClient.get.mockReturnValue(promise);

    try {
      await spotifyFunctions.getUsername();
    } catch (e) {
      expect(e.message).toBe('Could not get the username.');
    }
    done();
  });

  it('gets the Spotify playlistId of newly created playlist', async (done) => {
    const promise = PromiseFactory.createResolve({ data: { id: 'testPlaylistId' } });
    const httpClient = axios;
    const spotifyFunctions = new SpotifyFunctions(httpClient);

    httpClient.post.mockReturnValue(promise);

    const result = await spotifyFunctions.createPlaylist('userId', 'title');

    expect(result).toEqual('testPlaylistId');
    done();
  });

  it('returns error if there is an error grabbing Spotify playlistId of newly created playlist', async (done) => {
    const promise = PromiseFactory.createReject({ response: { data: { message: 'playlist not created' } } });
    const httpClient = axios;
    const spotifyFunctions = new SpotifyFunctions(httpClient);

    httpClient.post.mockReturnValue(promise);

    try {
      await spotifyFunctions.createPlaylist('userId', 'title');
    } catch (e) {
      expect(e.message).toBe('Could not create a new playlist.');
    }
    done();
  });

  it('gets a success response when tracks added to new playlist', async (done) => {
    const promise = PromiseFactory.createResolve({ data: { url: 'tracksAdded' } });
    const httpClient = axios;
    const spotifyFunctions = new SpotifyFunctions(httpClient);

    httpClient.post.mockReturnValue(promise);

    const result = await spotifyFunctions.addTracksToPlaylist('playlistId', 'title');

    expect(result).toEqual('tracksAdded');
    done();
  });

  it('returns error if there is an error adding tracks to newly created playlist', async (done) => {
    const promise = PromiseFactory.createReject({ response: { data: { message: 'tracks not added' } } });
    const httpClient = axios;
    const spotifyFunctions = new SpotifyFunctions(httpClient);

    httpClient.post.mockReturnValue(promise);

    try {
      await spotifyFunctions.addTracksToPlaylist('playlistId', 'title');
    } catch (e) {
      expect(e.message).toBe('Could not add tracks to playlist.');
    }
    done();
  });
});
