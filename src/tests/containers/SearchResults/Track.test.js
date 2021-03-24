import { shallow } from 'enzyme';
import React from 'react';
import Track from '../../../containers/SearchResults/Track';

describe('Track Component', () => {
  it('sets addedToList to true when addTrack is called', () => {
    const addTrack = jest.fn();
    const sampleUri = 'spotify:track:sampleUri1';
    const wrapper = shallow(<Track uri={sampleUri} addTrack={addTrack} />);

    wrapper.find('.available').simulate('click');

    expect(addTrack).toHaveBeenCalledWith(sampleUri);
  });

  it('sets addedToList to false when removeTrack is called', () => {
    const removeTrack = jest.fn();
    const sampleUri = 'spotify:track:sampleUri1';
    const wrapper = shallow(<Track uri={sampleUri} removeTrack={removeTrack} />);

    wrapper.find('.available').simulate('click');
    wrapper.find('.available').simulate('click');

    expect(removeTrack).toHaveBeenCalledWith(sampleUri);
  });
});
