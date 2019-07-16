/* eslint-disable no-undef */
import { mount, shallow } from 'enzyme';
import React from 'react';
import SetlistView from '../../containers/SetlistView';

describe('SetlistView Component', () => {
  it('renders without crashing', () => {
    shallow(<SetlistView setlist="" />);
  });

  it('displays the setlist from valid passed in props', () => {
    const testProps = {
      id: 'testId',
      eventDate: '07-01-2019',
      artist: 'artistName',
      venue: 'venueName',
      tracks: [
        { name: 'Song1', trackUri: 'spotify:track:sampleUri1' },
        { name: 'Song2', trackUri: 'spotify:track:sampleUri2' },
        { name: 'Song3', trackUri: 'spotify:track:sampleUri3' },
      ],
    };

    const wrapper = mount(<SetlistView setlist={testProps} />);

    expect(wrapper.instance().props.setlist.tracks.length).toEqual(3);
    expect(wrapper.find('Track').length).toEqual(3);
  });
});