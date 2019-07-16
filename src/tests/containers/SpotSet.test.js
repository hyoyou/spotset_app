/* eslint-disable no-undef */
import { shallow } from 'enzyme';
import React from 'react';
import MockSpotifyErrorFunctions from '../mocks/MockSpotifyErrorFunctions';
import MockSpotifySuccessFunctions from '../mocks/MockSpotifySuccessFunctions';
import SpotSet from '../../containers/SpotSet';

describe('SpotSet Component', () => {
  it('renders the Login component when user is not signed in', () => {
    const wrapper = shallow(<SpotSet />);

    expect(wrapper.instance().state.isAuthenticated).toBeFalsy();
    expect(wrapper.find('Login').length).toEqual(1);
    expect(wrapper.find('Logout').length).toEqual(0);
  });

  it('renders the Logout component when user is signed in', () => {
    const wrapper = shallow(<SpotSet />);
    wrapper.setState({ isAuthenticated: true });

    expect(wrapper.instance().state.isAuthenticated).toBeTruthy();
    expect(wrapper.find('Logout').length).toEqual(1);
    expect(wrapper.find('Login').length).toEqual(0);
  });

  it('formats the URL of the newly created playlist with the result from a successful call to create playlist', async (done) => {
    const wrapper = shallow(<SpotSet />);

    wrapper.instance().spotifyFunctions = new MockSpotifySuccessFunctions();
    await wrapper.instance().playlistHandler(5, 'title');

    process.nextTick(() => {
      expect(wrapper.state().playlistUrl).toEqual('https://open.spotify.com/playlist/5');

      done();
    });
  });

  it('returns an error when call to create a playlist results in an error', async (done) => {
    const wrapper = shallow(<SpotSet />);

    wrapper.instance().spotifyFunctions = new MockSpotifyErrorFunctions();
    await wrapper.instance().playlistHandler(5, 'title');

    process.nextTick(() => {
      expect(wrapper.state().error).toEqual('Could not get the username.');

      done();
    });
  });
});
