import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';
import PromiseFactory from './helpers/PromiseFactory';
import Setlist from '../containers/Setlist';

jest.mock('axios');

describe('Setlist Component', () => {
  it('renders without crashing', () => {
    shallow(<Setlist />);
  });

  it('fetches data from the server when server returns a success response', (done) => {
    const promise = PromiseFactory.createResolve({ data: {} });
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
        setlist: {},
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
      });

      spy.mockClear();
      done();
    });
  });
});
