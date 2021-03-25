/* eslint-disable no-undef */
import { mount, shallow } from 'enzyme';
import React from 'react';
import axios from 'axios';
import Error from '../../../components/Banner/Error';
import PromiseFactory from '../../testHelpers/PromiseFactory';
import Setlist from '../../../containers/SetlistResults/Setlist';

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
  xit('fetches setlist from the server when server returns a success response and saves to state', (done) => {
    const promise = PromiseFactory.createResolve({ data: testProps });
    const httpClient = axios;

    httpClient.get.mockReturnValue(promise);
    const spy = jest.spyOn(httpClient, 'get');

    const fakeSetlistId = 'setlistId';
    process.env.REACT_APP_SPOTSET_DEV_SERVER = 'test';
    const url = `${process.env.REACT_APP_SPOTSET_DEV_SERVER}/setlists/${fakeSetlistId}`;
    const wrapper = shallow(<Setlist httpClient={httpClient} setlistId={fakeSetlistId} />);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({ url });

    process.nextTick(() => {
      expect(wrapper.state().setlist).toEqual(testProps);

      spy.mockClear();
      done();
    });
  });

  xit('fetches error response from the server when server returns an error response and renders Error component', (done) => {
    const promise = PromiseFactory.createReject({ response: { data: { message: 'error fetching' } } });
    const httpClient = axios;

    httpClient.get.mockReturnValue(promise);
    const spy = jest.spyOn(httpClient, 'get');

    const fakeSetlistId = 'setlistId';
    process.env.REACT_APP_SPOTSET_DEV_SERVER = 'test';
    const url = `${process.env.REACT_APP_SPOTSET_DEV_SERVER}/setlists/${fakeSetlistId}`;
    const wrapper = shallow(<Setlist httpClient={httpClient} setlistId={fakeSetlistId} />);

    expect(spy).toHaveBeenCalledWith({ url });

    process.nextTick(() => {
      expect(wrapper.state().error).toEqual('error fetching');
      expect(wrapper.find(Error)).toHaveLength(1);

      spy.mockClear();
      done();
    });
  });

  xit('displays error response when server is down and renders Error component', (done) => {
    const promise = PromiseFactory.createReject('error');
    const httpClient = axios;

    httpClient.get.mockReturnValue(promise);
    const spy = jest.spyOn(httpClient, 'get');

    const fakeSetlistId = 'setlistId';
    const wrapper = shallow(<Setlist httpClient={httpClient} setlistId={fakeSetlistId} />);

    process.nextTick(() => {
      expect(wrapper.state().error).toEqual('There was an error connecting to the server');
      expect(wrapper.find(Error)).toHaveLength(1);

      spy.mockClear();
      done();
    });
  });

  xit('updates the title when saveTitle is called with the title of the playlist', (done) => {
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

  xit('adds track Uris to playlistTracks state when data is received', (done) => {
    const promise = PromiseFactory.createResolve({ data: testProps });
    const httpClient = axios;
    httpClient.get.mockReturnValue(promise);

    const wrapper = mount(<Setlist httpClient={httpClient} setlistId='testId' />);

    process.nextTick(() => {
      expect(wrapper.state().playlistTracks).toEqual(['spotify:track:sampleUri1', 'spotify:track:sampleUri2', 'spotify:track:sampleUri3']);

      done();
    });
  });

  xit('adds removes a track Uri from playlistTracks state when handleRemoveTrack is called with the uri', (done) => {
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

  xit('adds a track Uri from playlistTracks state when handleAddTrack is called with the uri', (done) => {
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

  xit('displays loading spinner while setlist is loading', () => {
    const wrapper = mount(<Setlist />);

    expect(wrapper.state().isLoading).toEqual(true);
    expect(wrapper.find('#icon-spinner').length).toEqual(2);
  });

  xit('does not display loading spinner when setlist is loaded', () => {
    const wrapper = mount(<Setlist />);
    wrapper.setState({ isLoading: false });

    expect(wrapper.state().isLoading).toEqual(false);
    expect(wrapper.find('#icon-spinner').length).toEqual(0);
  });
});
