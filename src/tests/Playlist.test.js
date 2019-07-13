/* eslint-disable no-undef */
import { shallow } from 'enzyme';
import React from 'react';
import Playlist from '../containers/Playlist';

describe('Playlist Component', () => {
  it('renders a button to create playlist when user is signed in', () => {
    const wrapper = shallow(<Playlist isUser={true} />);

    expect(wrapper.exists('#btn-spotify')).toBeTruthy();
    expect(wrapper.text()).not.toContain('Log in to save playlist');
  });

  it('renders a message to log in when user is not signed in', () => {
    const wrapper = shallow(<Playlist isUser={false} />);

    expect(wrapper.text()).toContain('Log in to save playlist');
    expect(wrapper.exists('#btn-spotify')).toBeFalsy();
  });

  it('renders only a button that links to the newly created playlist', () => {
    const wrapper = shallow(<Playlist playlistUrl="http://playlist.test" />);

    expect(wrapper.text()).toContain('Your playlist has been created');
    expect(wrapper.exists('#btn-playlist')).toBeTruthy();
    expect(wrapper.exists('#btn-spotify')).toBeFalsy();
  });
});
