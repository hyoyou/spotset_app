/* eslint-disable no-undef */
import { mount, shallow } from 'enzyme';
import React from 'react';
import axios from 'axios';
import PromiseFactory from './helpers/PromiseFactory';
import Setlist from '../containers/Setlist';

jest.mock('axios');

describe('Setlist Component', () => {
  it('renders without crashing', () => {
    shallow(<Setlist />);
  });

  it('fetches data from the server when server returns a success response', (done) => {
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

    const promise = PromiseFactory.createResolve({ data: testProps });
    const httpClient = axios;

    httpClient.get.mockReturnValue(promise);
    const spy = jest.spyOn(httpClient, 'get');

    const fakeSetlistId = 'setlistId';
    const url = `https://localhost:5001/api/setlists/${fakeSetlistId}`;
    const wrapper = shallow(<Setlist httpClient={httpClient} setlistId={fakeSetlistId} />);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(url);

    process.nextTick(() => {
      expect(wrapper.state()).toEqual({
        error: '',
        setlist: testProps,
        title: 'artistName at venueName on 07-01-2019',
        playlistId: '',
        playlistTracks: [],
      });

      spy.mockClear();
      done();
    });
  });

  it('fetches error response from the server when server returns an error response', (done) => {
    const promise = PromiseFactory.createReject({ message: 'error fetching' });
    const httpClient = axios;

    httpClient.get.mockReturnValue(promise);
    const spy = jest.spyOn(httpClient, 'get');

    const fakeSetlistId = 'setlistId';
    const url = `https://localhost:5001/api/setlists/${fakeSetlistId}`;
    const wrapper = shallow(<Setlist httpClient={httpClient} setlistId={fakeSetlistId} />);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(url);

    process.nextTick(() => {
      expect(wrapper.state()).toEqual({
        error: 'error fetching',
        setlist: '',
        title: '',
        playlistId: '',
        playlistTracks: [],
      });

      spy.mockClear();
      done();
    });
  });

  it('updates the title when saveTitle is called with the title of the playlist', (done) => {
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

    const promise = PromiseFactory.createResolve({ data: testProps });
    const httpClient = axios;
    httpClient.get.mockReturnValue(promise);

    const wrapper = mount(<Setlist httpClient={httpClient} setlistId={'setlistId'} />);

    process.nextTick(() => {
      expect(wrapper.state()).toEqual({
        error: '',
        setlist: testProps,
        title: 'artistName at venueName on 07-01-2019',
        playlistId: '',
        playlistTracks: [],
      });

      done();
    });

    wrapper.instance().saveTitle('Artist at Venue on Date');

    expect(wrapper.state()).toEqual({
      error: '',
      setlist: '',
      title: 'Artist at Venue on Date',
      playlistId: '',
      playlistTracks: [],
    });
  });
});
