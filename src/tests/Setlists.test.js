/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';
import Setlists from '../containers/Setlists';

describe('Setlists Component', () => {
  it('renders an input field for the setlistId that updates the state when changed', () => {
    const wrapper = mount(<Setlists />);

    expect(wrapper.state().setlistId).toEqual('');

    const input = wrapper.find('#setlistId');
    input.instance().value = 'abc1234';
    input.simulate('change');
    expect(wrapper.instance().state.setlistId).toEqual('abc1234');
  });

  it('callback function is called when display button is clicked', () => {
    const onClick = jest.fn();

    const wrapper = mount(<Setlists onClick={onClick} />);

    const button = wrapper.find('#btn-setlistId').at(0);
    button.simulate('click');
    expect(onClick).toHaveBeenCalled();
  });
});
