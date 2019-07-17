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

  it('clears the state when user logs out', () => {
    const wrapper = shallow(<SpotSet />);
    wrapper.setState({
      isAuthenticated: true,
      accessToken: 'testToken',
    });

    wrapper.instance().logout();

    expect(wrapper.instance().state.isAuthenticated).toBeFalsy();
    expect(wrapper.instance().state.accessToken).toBeNull();
  });

  it('checks for logged in user upon render and updates state', () => {
    const spy = jest.spyOn(SpotSet.prototype, 'checkForAccessToken');
    const wrapper = shallow(<SpotSet />);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(wrapper.state().isAuthenticated).toBeFalsy();
  });

  it('checks for setlist id upon render and updates state', () => {
    const spy = jest.spyOn(SpotSet.prototype, 'checkForSetlist');
    const wrapper = shallow(<SpotSet />);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(wrapper.state().isAuthenticated).toBeFalsy();
  });

  it('sets the setlist when setSetlist is called with an ID', () => {
    const wrapper = shallow(<SpotSet />)
    wrapper.instance().setSetlist('testId');

    expect(wrapper.state().setlistId).toEqual('testId');
  });

  it('clears the setlist when clearSetlist is called', () => {
    const wrapper = shallow(<SpotSet />);
    wrapper.setState({
      setlistId: 'testId',
      playlistUrl: 'https://test.com',
      error: null
    });

    wrapper.instance().clearSetlist();

    expect(wrapper.state().setlistId).toBeNull();
    expect(wrapper.state().playlistUrl).toBeNull();
    expect(wrapper.state().error).toBeNull();
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
