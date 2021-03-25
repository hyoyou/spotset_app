import { mount } from 'enzyme';
import React, { useState as useStateMock } from 'react';
import TitleForm from '../../../containers/SetlistResults/TitleForm';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

describe('TitleForm Component', () => {
  const setState = jest.fn();
  const title = 'artistName at venueName on 07-01-2019';
  let wrapper;

  beforeEach(() => {
    useStateMock.mockImplementation(init => [init, setState]);

    wrapper = mount(<TitleForm title={title} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('displays an input field prepopulated with the playlist title that is passed in as props', () => {
    expect(wrapper.find('input#title').props().value).toEqual(title);
  });

  it('updates the title when the title input field is changed', () => {
    const input = wrapper.find('input').at(0);
    const expectedValue = 'Artist at Venue on Date';

    input.simulate('change', { target: { value: expectedValue } });

    expect(setState).toHaveBeenCalledWith(expectedValue);
  });
});
