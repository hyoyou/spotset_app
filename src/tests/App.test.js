/* eslint-disable no-undef */
import { mount, shallow } from 'enzyme';
import React from 'react';
import App from '../App';
import Setlists from '../containers/Setlists';

describe('App Component', () => {
  it('renders without crashing', () => {
    shallow(<App />);
  });

  it('renders child components', () => {
    const wrapper = mount(<App />);

    expect(wrapper.find(Setlists)).toHaveLength(1);
  });
});
