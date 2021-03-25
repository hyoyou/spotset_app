import { shallow } from 'enzyme';
import React from 'react';
import ConditionalContainer from '../../components/ConditionalContainer';

const TestComponent = () => {
  return (
    <div id='test'>
      Test Component
    </div>
  )
}

describe('ConditionalContainer', () => {
  describe('when condition is truthy', () => {
    it('renders children', () => {
      const wrapper = shallow(
        <ConditionalContainer condition={true}>
          <TestComponent />
        </ConditionalContainer>
      )

      expect(wrapper.text('Test Component')).toBeTruthy();
    });
  });

  describe('when condition is falsy', () => {
    it('does NOT render children', () => {
      const wrapper = shallow(
        <ConditionalContainer condition={false}>
          <TestComponent />
        </ConditionalContainer>
      )

      expect(wrapper.text('Test Component')).toBeFalsy();
    });
  });
});