import { mount } from "enzyme";
import React from "react";
import TextInput from "../../../components/Form/TextInput";

describe("TextInput", () => {
  it("invokes the onChange prop when changed", () => {
    const handleChangeSpy = jest.fn();
    const wrapper = mount(
      <TextInput onChange={handleChangeSpy} value="some value" />
    );

    wrapper.find("input").simulate("change");

    expect(handleChangeSpy).toHaveBeenCalled();
  });
});
