import { shallow } from 'enzyme';
import React from 'react';
import Button from '../../../components/Button/Button';
import ButtonElementType from '../../../components/Button/ButtonElementType';

describe('Button', () => {
  it('should render provided children', () => {
    const wrapper = shallow(
      <Button>
        <div className='test-div'>Testing</div>
      </Button>
    );

    expect(wrapper.exists('.test-div')).toBe(true);
  });

  it("should trigger onClick when component is a button and onClick provided", () => {
    const spy = jest.fn();
    const wrapper = shallow(
      <Button onSubmit={spy}>
        Test Button
      </Button>
    );
    const button = wrapper.find("button");

    button.simulate("click");

    expect(spy).toHaveBeenCalled();
  });

  it('should have an anchor element and an href given component is an "anchor" and href provided', () => {
    const link = "http://test.test";
    const wrapper = shallow(
      <Button buttonType={ButtonElementType.ANCHOR} href={link}>
        Test Button
      </Button>
    );
    const anchor = wrapper.find("a");

    expect(anchor.length).toBeGreaterThan(0);
    expect(anchor.prop("href")).toEqual(link);
  });
})