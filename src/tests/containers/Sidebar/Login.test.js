import { mount } from "enzyme";
import React from "react";
import { Login } from "../../../containers/Sidebar";

describe("Login Component", () => {
  it("renders Button with redirectUrl", () => {
    const testUrl = "test.com";
    const wrapper = mount(<Login redirectUrl={testUrl} />);

    wrapper.find("Button").simulate("click");

    expect(wrapper.find("Button").props().href).toEqual(testUrl);
  });
});
