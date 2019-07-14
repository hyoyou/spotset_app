/* eslint-disable no-undef */
import { mount } from 'enzyme';
import React from 'react';
import Login from '../containers/Login';
import SpotifyFunctions from '../helpers/SpotifyFunctions';

describe('Login Component', () => {
  it('Log In button calls the function to get Spotify log in page URL when clicked', () => {
    const spotifyFunctions = new SpotifyFunctions('httpClient');
    const getRedirectUrl = spotifyFunctions.getRedirectUrl = jest.fn();
    const wrapper = mount(<Login spotifyFunctions={spotifyFunctions} />);

    wrapper.find('#btn-spotify').simulate('click');
    expect(getRedirectUrl).toHaveBeenCalled();
  });
});
