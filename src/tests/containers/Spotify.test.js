/* eslint-disable no-undef */
import { shallow } from 'enzyme';
import React from 'react';
import MockSpotifyErrorFunctions from '../mocks/MockSpotifyErrorFunctions';
import MockSpotifySuccessFunctions from '../mocks/MockSpotifySuccessFunctions';
import Spotify from '../../containers/Spotify';

describe('Spotify Component', () => {
  it('renders the Login component when user is not signed in', () => {
    const wrapper = shallow(<Spotify />);

    expect(wrapper.instance().state.isAuthenticated).toBeFalsy();
    expect(wrapper.find('Login').length).toEqual(1);
    expect(wrapper.find('Logout').length).toEqual(0);
  });

  it('renders the Logout component when user is signed in', () => {
    const wrapper = shallow(<Spotify />);
    wrapper.setState({ isAuthenticated: true });

    expect(wrapper.instance().state.isAuthenticated).toBeTruthy();
    expect(wrapper.find('Logout').length).toEqual(1);
    expect(wrapper.find('Login').length).toEqual(0);
  });

  it('the URL of the newly created playlist is saved to component state when playlistHandler called', async (done) => {
    const wrapper = shallow(<Spotify />);

    wrapper.instance().spotifyFunctions = new MockSpotifySuccessFunctions();
    await wrapper.instance().playlistHandler(5, 'title');

    process.nextTick(() => {
      expect(wrapper.state().playlistUrl).toEqual('https://open.spotify.com/playlist/5');

      done();
    });
  });

  it('returns an error when playlistHandler ', async (done) => {
    const wrapper = shallow(<Spotify />);

    wrapper.instance().spotifyFunctions = new MockSpotifyErrorFunctions();
    await wrapper.instance().playlistHandler(5, 'title');

    process.nextTick(() => {
      expect(wrapper.state().error).toEqual('Could not get the username.');

      done();
    });
  });
});
