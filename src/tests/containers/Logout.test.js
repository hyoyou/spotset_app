/* eslint-disable no-undef */
import { shallow } from 'enzyme';
import React from 'react';
import Logout from '../../containers/Logout';

describe('Logout Component', () => {
  it('Log out button calls the logout handler when clicked', () => {
    const spy = jest.fn();
    const wrapper = shallow(<Logout logOutHandler={spy} />);

    wrapper.find('#btn-spotify').simulate('click');
    expect(spy).toHaveBeenCalled();
  });
});
