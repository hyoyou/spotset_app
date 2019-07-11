/* eslint-disable no-undef */
import { shallow } from 'enzyme';
import React from 'react';
import Spotify from '../containers/Spotify';

describe('Spotify Component', () => {
  it('renders the Login component when user is not signed in', () => {
    const wrapper = shallow(<Spotify />);

    expect(wrapper.instance().state.isAuthenticated).toBeFalsy();
    expect(wrapper.find('Login').length).toEqual(1);
    expect(wrapper.find('Playlist').length).toEqual(0);
  });

  it('renders the Playlist component when user is signed in', () => {
    const wrapper = shallow(<Spotify />);
    wrapper.setState({ isAuthenticated: true });

    expect(wrapper.instance().state.isAuthenticated).toBeTruthy();
    expect(wrapper.find('Playlist').length).toEqual(1);
    expect(wrapper.find('Login').length).toEqual(0);
  });
});
