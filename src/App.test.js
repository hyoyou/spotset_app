import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

it('renders without crashing', () => {
  shallow(<App />);
});

it('renders values', () => {
  const wrapper = shallow(<App />);
  const testValue = <h2>Values from API:</h2>;

  expect(wrapper.contains(testValue)).toEqual(true);
});