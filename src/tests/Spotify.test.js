/* eslint-disable no-undef */
import { mount, shallow } from 'enzyme';
import React from 'react';
import axios from 'axios';
import Spotify from '../containers/Spotify';
import SpotifyFunctions from '../helpers/SpotifyFunctions';

jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
}));


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
    const wrapper = mount(<Spotify />);
    await wrapper.instance().playlistHandler('p', 't');

    process.nextTick(() => {
      expect(wrapper.state().playlistUrl).toContain('https://open.spotify.com/playlist/');

      done();
    });
  });
});
