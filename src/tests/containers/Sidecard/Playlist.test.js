/* eslint-disable no-undef */
import { shallow } from "enzyme";
import React from "react";
import Playlist from "../../../containers/Sidecard/Playlist";

describe("Playlist Component", () => {
  it("renders a button to create playlist when user is signed in", () => {
    const wrapper = shallow(<Playlist isUser={true} />);

    expect(wrapper.exists("#btn-spotify")).toBeTruthy();
  });

  it("removes message to sign in if user is signed in", () => {
    const wrapper = shallow(<Playlist isUser={true} />);

    expect(wrapper.text()).not.toContain("Log in to save playlist");
  });

  it("renders a message to log in when user is not signed in", () => {
    const wrapper = shallow(<Playlist isUser={false} />);

    expect(wrapper.text()).toContain("Log in to save playlist");
  });

  it("does not display button to save playlist if user is not signed in", () => {
    const wrapper = shallow(<Playlist isUser={false} />);

    expect(wrapper.exists("#btn-spotify")).toBeFalsy();
  });

  it("renders a button that links to the newly created playlist when saved", () => {
    const wrapper = shallow(<Playlist playlistUrl="http://playlist.test" />);

    expect(wrapper.text()).toContain("Your playlist has been created");
    expect(wrapper.exists("#btn-playlist")).toBeTruthy();
    expect(wrapper.exists("#btn-spotify")).toBeFalsy();
  });

  it("renders a button that calls a function to clear chosen setlist", () => {
    const mockClear = jest.fn();
    const wrapper = shallow(<Playlist clearSetlist={mockClear} />);

    expect(wrapper.exists("#btn-setlists")).toBeTruthy();
    wrapper.find("#btn-setlists").simulate("click");
    expect(mockClear).toHaveBeenCalled();
  });
});
