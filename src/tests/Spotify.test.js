/* eslint-disable no-undef */
import { shallow } from 'enzyme';
import React from 'react';
import * as SpotifyHelper from '../helpers/spotifyHelpers';
import Spotify from '../containers/Spotify';

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

  it('returns the URL of the newly created playlist when playlistHandler called', async (done) => {
    const isValid = jest.fn();
    isValid.mockReturnValue(true);

    const createAndSavePlaylist = SpotifyHelper.createAndSavePlaylist = jest.fn();
    createAndSavePlaylist.mockReturnValue('5');

    const wrapper = shallow(<Spotify />);
    let result = await wrapper.instance().playlistHandler("p", "t");

    process.nextTick(() => {
      expect(result).toEqual(`https://open.spotify.com/playlist/5`);

      done();
    });
  });
});
