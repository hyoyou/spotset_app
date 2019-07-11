/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';
import Spotify from '../containers/Spotify';

describe('App Component', () => {
  it('renders without crashing', () => {
    shallow(<App />);
  });

  it('renders child components', () => {
    const wrapper = shallow(<App />);

    expect(wrapper.find(Spotify)).toHaveLength(1);
  });
});
