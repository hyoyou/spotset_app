/* eslint-disable no-undef */
import { shallow } from 'enzyme';
import React from 'react';
import Track from '../../containers/Track';

describe('Track Component', () => {
  it('sets addedToList to true when addTrack is called', (done) => {
    const addTrack = Object.assign(jest.fn(), { addTrack: () => {} });
    const sampleUri = 'spotify:track:sampleUri1';
    const wrapper = shallow(<Track uri={'sampleUri'} addTrack={addTrack} />);

    wrapper.instance().addTrack(sampleUri);

    process.nextTick(() => {
      expect(wrapper.state().addedToList).toBeTruthy();

      done();
    });
  });

  it('sets addedToList to false when removeTrack is called', (done) => {
    const removeTrack = Object.assign(jest.fn(), { removeTrack: () => {} });
    const sampleUri = 'spotify:track:sampleUri1';
    const wrapper = shallow(<Track uri={'sampleUri'} removeTrack={removeTrack} />);

    wrapper.instance().removeTrack(sampleUri);

    process.nextTick(() => {
      expect(wrapper.state().addedToList).toBeFalsy();

      done();
    });
  });
});
