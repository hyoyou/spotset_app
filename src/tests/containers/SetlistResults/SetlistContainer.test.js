import { mount } from "enzyme";
import React, { useState as useStateMock } from "react";
import axios from "axios";
import PromiseFactory from "../../testHelpers/PromiseFactory";
import SetlistContainer from "../../../containers/SetlistResults/SetlistContainer";

jest.mock("axios");

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn()
}));

const testProps = {
  id: "testId",
  eventDate: "07-01-2019",
  artist: "artistName",
  venue: "venueName",
  tracks: [
    { name: "Song1", trackUri: "spotify:track:sampleUri1" },
    { name: "Song2", trackUri: "spotify:track:sampleUri2" },
    { name: "Song3", trackUri: "spotify:track:sampleUri3" }
  ]
};

describe("SetlistContainer Component", () => {
  const setState = jest.fn();

  beforeEach(() => {
    useStateMock.mockImplementation((init) => [init, setState]);
  });

  afterEach(() => {
    delete process.env.REACT_APP_SPOTSET_DEV_SERVER;

    jest.clearAllMocks();
  });

  it("fetches setlist from the server", (done) => {
    const promise = PromiseFactory.createResolve({ data: testProps });
    const httpClient = axios;

    httpClient.get.mockReturnValue(promise);
    const spy = jest.spyOn(httpClient, "get");

    const fakeSetlistId = "setlistId";
    process.env.REACT_APP_SPOTSET_DEV_SERVER = "test";
    const url = `${process.env.REACT_APP_SPOTSET_DEV_SERVER}/setlists/${fakeSetlistId}`;
    const wrapper = mount(
      <SetlistContainer httpClient={httpClient} setlistId={fakeSetlistId} />
    );

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({ url });

    done();
  });

  it("updates the title when saveTitle is called with the title of the playlist", (done) => {
    const promise = PromiseFactory.createResolve({ data: testProps });
    const httpClient = axios;
    httpClient.get.mockReturnValue(promise);

    mount(<SetlistContainer httpClient={httpClient} setlistId="testId" />);

    process.nextTick(() => {
      expect(setState).toHaveBeenCalledWith(
        "artistName at venueName on 07-01-2019"
      );

      done();
    });
  });

  it("adds track Uris to playlistTracks state when data is received", (done) => {
    const promise = PromiseFactory.createResolve({ data: testProps });
    const httpClient = axios;
    httpClient.get.mockReturnValue(promise);

    mount(<SetlistContainer httpClient={httpClient} setlistId="testId" />);

    process.nextTick(() => {
      expect(setState).toHaveBeenCalledWith([
        "spotify:track:sampleUri1",
        "spotify:track:sampleUri2",
        "spotify:track:sampleUri3"
      ]);

      done();
    });
  });

  it("displays loading spinner while setlist is loading", () => {
    const wrapper = mount(<SetlistContainer />);

    expect(wrapper.find("Icon#icon-spinner")).toBeTruthy();
  });
});
