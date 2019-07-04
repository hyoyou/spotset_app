import React from 'react';
import SetlistView from '../components/SetlistView';
import { shallow } from 'enzyme';

describe('SetlistView Component', () => {
  it('renders without crashing', () => {
    shallow(<SetlistView setlist={""} />);
  });

  it('renders the playlist title from valid passed in props', () => {
    const testProps = {
      id: "testId",
      eventDate: "01-07-2019",
      artist: { name: "artistName" },
      venue: { name: "venueName" },
      sets: { set: []}
    };

    const wrapper = shallow(
      <SetlistView setlist={testProps} />
    )

    expect(wrapper.text()).toContain('artistName at venueName on 01-07-2019')
  })
});