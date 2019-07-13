/* eslint-disable no-undef */
import { mount, shallow } from 'enzyme';
import React from 'react';
import axios from 'axios';
import PromiseFactory from './testHelpers/PromiseFactory';
import Setlist from '../containers/Setlist';

jest.mock('axios');

afterEach(() => {
  delete process.env.REACT_APP_SPOTSET_DEV_SERVER;
});

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

describe('Setlist Component', () => {
  it('renders without crashing', () => {
    shallow(<Setlist />);
  });

  it('fetches setlist from the server when server returns a success response and saves to state', (done) => {
    const promise = PromiseFactory.createResolve({ data: testProps });
    const httpClient = axios;

    httpClient.get.mockReturnValue(promise);
    const spy = jest.spyOn(httpClient, 'get');

    const fakeSetlistId = 'setlistId';
    process.env.REACT_APP_SPOTSET_DEV_SERVER = 'test';
    const url = `${process.env.REACT_APP_SPOTSET_DEV_SERVER}/setlists/${fakeSetlistId}`;
    const wrapper = shallow(<Setlist httpClient={httpClient} setlistId={fakeSetlistId} />);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(url);

    process.nextTick(() => {
      expect(wrapper.state().setlist).toEqual(testProps);

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
    process.env.REACT_APP_SPOTSET_DEV_SERVER = 'test';
    const url = `${process.env.REACT_APP_SPOTSET_DEV_SERVER}/setlists/${fakeSetlistId}`;
    const wrapper = shallow(<Setlist httpClient={httpClient} setlistId={fakeSetlistId} />);

    expect(spy).toHaveBeenCalledWith(url);

    process.nextTick(() => {
      expect(wrapper.state().error).toEqual('error fetching');

      spy.mockClear();
      done();
    });
  });

  it('updates the title when saveTitle is called with the title of the playlist', (done) => {
    const promise = PromiseFactory.createResolve({ data: testProps });
    const httpClient = axios;
    httpClient.get.mockReturnValue(promise);

    const wrapper = mount(<Setlist httpClient={httpClient} setlistId='testId' />);

    process.nextTick(() => {
      expect(wrapper.state().title).toEqual('artistName at venueName on 07-01-2019');

      done();
    });

    wrapper.instance().saveTitle('Artist at Venue on Date');

    expect(wrapper.state().title).toEqual('Artist at Venue on Date');
  });

  it('adds track Uris to playlistTracks state when data is received', (done) => {
    const promise = PromiseFactory.createResolve({ data: testProps });
    const httpClient = axios;
    httpClient.get.mockReturnValue(promise);

    const wrapper = mount(<Setlist httpClient={httpClient} setlistId='testId' />);

    process.nextTick(() => {
      expect(wrapper.state().playlistTracks).toEqual(['spotify:track:sampleUri1', 'spotify:track:sampleUri2', 'spotify:track:sampleUri3']);

      done();
    });
  });

  it('adds removes a track Uri from playlistTracks state when handleRemoveTrack is called with the uri', (done) => {
    const promise = PromiseFactory.createResolve({ data: testProps });
    const httpClient = axios;
    httpClient.get.mockReturnValue(promise);

    const wrapper = mount(<Setlist httpClient={httpClient} setlistId='testId' />);

    process.nextTick(() => {
      expect(wrapper.state().playlistTracks).toEqual(['spotify:track:sampleUri1', 'spotify:track:sampleUri2', 'spotify:track:sampleUri3']);
      wrapper.instance().handleRemoveTrack('spotify:track:sampleUri1');
      expect(wrapper.state().playlistTracks).toEqual(['spotify:track:sampleUri2', 'spotify:track:sampleUri3']);
      done();
    });
  });

  it('adds a track Uri from playlistTracks state when handleAddTrack is called with the uri', (done) => {
    const promise = PromiseFactory.createResolve({ data: testProps });
    const httpClient = axios;
    httpClient.get.mockReturnValue(promise);

    const wrapper = mount(<Setlist httpClient={httpClient} setlistId='testId' />);

    process.nextTick(() => {
      expect(wrapper.state().playlistTracks).toEqual(['spotify:track:sampleUri1', 'spotify:track:sampleUri2', 'spotify:track:sampleUri3']);
      wrapper.instance().handleAddTrack('spotify:track:sampleUri4');
      expect(wrapper.state().playlistTracks).toEqual(['spotify:track:sampleUri1', 'spotify:track:sampleUri2', 'spotify:track:sampleUri3', 'spotify:track:sampleUri4']);
      done();
    });
  });
});
