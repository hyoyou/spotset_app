/* eslint-disable no-undef */
import { mount } from "enzyme";
import React from "react";
import Login from "../../../containers/Sidecard/Login";
import SpotifyFunctions from "../../../helpers/SpotifyFunctions";

describe("Login Component", () => {
  it("Log In button calls the function to get Spotify log in page URL when clicked", () => {
    const spotifyFunctions = new SpotifyFunctions("httpClient");
    spotifyFunctions.getRedirectUrl = jest.fn();
    const wrapper = mount(<Login spotifyFunctions={spotifyFunctions} />);

    wrapper.find("Button").simulate("click");
    expect(spotifyFunctions.getRedirectUrl).toHaveBeenCalled();
  });
});
