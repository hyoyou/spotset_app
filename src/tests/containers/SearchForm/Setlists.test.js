/* eslint-disable no-undef */
import { mount } from 'enzyme';
import React, { useState as useStateMock } from 'react';
import Setlists from '../../../containers/SearchForm/Setlists';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

describe('Setlists Component', () => {
  const setState = jest.fn();

  beforeEach(() => {
    useStateMock.mockImplementation(init => [init, setState]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders an input field for the setlistId with a default value', () => {
    const wrapper = mount(<Setlists />);
    const input = wrapper.find('#setlistId');

    expect(input.props().value).toEqual('');
  });

  it('updates setlistId state with value in input field', () => {
    const wrapper = mount(<Setlists />);
    const input = wrapper.find('#setlistId');

    input.simulate('change', { target: { value: 'abc1234' } });

    expect(setState).toHaveBeenCalledWith('abc1234');
  });

  it('callback function is called when display button is clicked', () => {
    const onClick = jest.fn();
    const wrapper = mount(<Setlists onClick={onClick} />);
    const button = wrapper.find('#btn-setlistId').at(0);

    button.simulate('click');

    expect(onClick).toHaveBeenCalled();
  });
});
