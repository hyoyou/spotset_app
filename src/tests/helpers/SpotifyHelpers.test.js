/* eslint-disable no-undef */
import axios from 'axios';
import * as SpotifyHelper from '../../helpers/SpotifyHelpers';
import PromiseFactory from '../testHelpers/PromiseFactory';

jest.mock('axios');

describe('Spotify Helper Functions', () => {
  it('gets the Spotify userId of logged in user', async (done) => {
    const promise = PromiseFactory.createResolve({ data: { id: 'testId' } });
    const httpClient = axios;

    httpClient.get.mockReturnValue(promise);

    const result = await SpotifyHelper.getUserId();

    expect(result).toEqual('testId');
    done();
  });

  it('returns error if there is an error grabbing Spotify userId of logged in user', async (done) => {
    const promise = PromiseFactory.createReject({ error: 'user not found' });
    const httpClient = axios;

    httpClient.get.mockReturnValue(promise);

    const result = await SpotifyHelper.getUserId();

    expect(result).toEqual({ error: 'user not found' });
    done();
  });

  it('gets the Spotify playlistId of newly created playlist', async (done) => {
    const promise = PromiseFactory.createResolve({ data: { id: 'testPlaylistId' } });
    const httpClient = axios;

    httpClient.post.mockReturnValue(promise);

    const result = await SpotifyHelper.createPlaylist('userId', 'title');

    expect(result).toEqual('testPlaylistId');
    done();
  });

  it('returns error if there is an error grabbing Spotify playlistId of newly created playlist', async (done) => {
    const promise = PromiseFactory.createReject({ error: 'playlist not created' });
    const httpClient = axios;

    httpClient.post.mockReturnValue(promise);

    const result = await SpotifyHelper.createPlaylist('userId', 'title');

    expect(result).toEqual({ error: 'playlist not created' });
    done();
  });

  it('gets a success response when tracks added to new playlist', async (done) => {
    const promise = PromiseFactory.createResolve({ data: { url: 'tracksAdded' } });
    const httpClient = axios;

    httpClient.post.mockReturnValue(promise);

    const result = await SpotifyHelper.addTracksToPlaylist('playlistId', 'title');

    expect(result).toEqual('tracksAdded');
    done();
  });

  it('returns error if there is an error adding tracks to newly created playlist', async (done) => {
    const promise = PromiseFactory.createReject({ error: 'tracks not added' });
    const httpClient = axios;

    httpClient.post.mockReturnValue(promise);

    const result = await SpotifyHelper.addTracksToPlaylist('playlistId', 'title');

    expect(result).toEqual({ error: 'tracks not added' });
    done();
  });
});
