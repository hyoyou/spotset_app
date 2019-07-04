import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';
import Setlist from '../containers/Setlist';

describe('App Component', () => {
  it('renders without crashing', () => {
    shallow(<App />);
  });

  it('renders child components', () => {
    const wrapper = shallow(<App />);
    const testSetlistId = '3393481d';

    expect(wrapper.contains(<Setlist setlistId={testSetlistId} />)).toEqual(true);
  });
})