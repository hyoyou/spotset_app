/* eslint-disable no-undef */
import { mount } from 'enzyme';
import React from 'react';
import * as SpotifyHelper from '../helpers/spotifyHelpers';
import Login from '../containers/Login';

describe('Login Component', () => {
  it('Log In button calls the function to get Spotify log in page URL when clicked', () => {
    const getRedirectUrl = SpotifyHelper.getRedirectUrl = jest.fn();
    const wrapper = mount(<Login />);

    wrapper.find('#btn-spotify').simulate('click');
    expect(getRedirectUrl).toHaveBeenCalled();
  });
});
