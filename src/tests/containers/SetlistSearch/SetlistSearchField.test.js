import { mount } from 'enzyme';
import React from 'react';
import SetlistSearchField from '../../../containers/SetlistSearch/SetlistSearchField';

describe('SetlistSearchField', () => {
  it('renders an input field and a submit button', () => {
    const wrapper = mount(<SetlistSearchField />);

    expect(wrapper.find('SearchInput')).toBeTruthy();
    expect(wrapper.find('Button')).toBeTruthy();
  })
})
