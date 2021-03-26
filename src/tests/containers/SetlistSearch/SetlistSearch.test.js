import { mount } from "enzyme";
import React, { useState as useStateMock } from "react";
import SetlistSearch from "../../../containers/SetlistSearch/SetlistSearch";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn()
}));

describe("SetlistSearch Component", () => {
  const setState = jest.fn();

  beforeEach(() => {
    useStateMock.mockImplementation((init) => [init, setState]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders SetlistSearchField", () => {
    const wrapper = mount(<SetlistSearch />);

    expect(wrapper.find("SetlistSearchField")).toBeTruthy();
  });

  it("renders SearchInstructions", () => {
    const wrapper = mount(<SetlistSearch />);

    expect(wrapper.find("SearchInstructions")).toBeTruthy();
  });

  it("updates setlistId state with value in input field", () => {
    const wrapper = mount(<SetlistSearch />);
    const input = wrapper.find("input#setlistId");

    input.simulate("change", { target: { value: "abc1234" } });

    expect(setState).toHaveBeenCalledWith("abc1234");
  });
});
