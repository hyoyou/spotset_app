import { mount, shallow } from "enzyme";
import React from "react";
import App from "../App";
import SpotSet from "../containers/SpotSet";

describe("App Component", () => {
  it("renders without crashing", () => {
    shallow(<App />);
  });

  it("renders child components", () => {
    const wrapper = mount(<App />);

    expect(wrapper.find(SpotSet)).toHaveLength(1);
  });
});
