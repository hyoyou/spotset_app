/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';
import TitleForm from '../containers/TitleForm';

describe('TitleForm Component', () => {
  it('displays an input field prepopulated with the playlist title that can be edited', () => {
    const title = 'artistName at venueName on 07-01-2019';

    const wrapper = mount(<TitleForm title={title} />);
    wrapper.setProps({ title });

    expect(wrapper.instance().props.title).toEqual('artistName at venueName on 07-01-2019');

    const input = wrapper.find('input').at(0);
    input.instance().value = 'Artist at Venue on Date';
    input.simulate('change');
    expect(wrapper.instance().state.newTitle).toEqual('Artist at Venue on Date');
  });
});
