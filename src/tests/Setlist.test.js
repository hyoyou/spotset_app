import React from 'react';
import { shallow } from 'enzyme';
import Setlist from '../containers/Setlist';

describe('Setlist Component', () => {
  it('renders without crashing', () => {
    shallow(<Setlist />);
  });

  it('fetches data from the server when server returns a success response', (done) => {
    const mockSuccessResponse = {};
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

    const fakeSetlistId = 'setlistId';
    const wrapper = shallow(<Setlist setlistId={fakeSetlistId} />);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(`/api/setlists/${fakeSetlistId}`);

    process.nextTick(() => {
      expect(wrapper.state()).toEqual({
        error: '',
        setlist: {},
      });

      global.fetch.mockClear();
      done();
    });
  });

  it('fetches error response from the server when server returns an error response', (done) => {
    const mockErrorResponse = 'error fetching';
    const mockFetchPromise = Promise.reject(mockErrorResponse);
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

    const fakeSetlistId = 'setlistId';
    const wrapper = shallow(<Setlist setlistId={fakeSetlistId} />);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(`/api/setlists/${fakeSetlistId}`);

    process.nextTick(() => {
      expect(wrapper.state()).toEqual({
        error: 'error fetching',
        setlist: '',
      });

      global.fetch.mockClear();
      done();
    });
  });
});
