/* eslint-env jest */

import React from "react";
import { shallow } from "enzyme";

import { Input } from ".";

describe("Input", () => {
  let component;

  beforeEach(() => {
    component = shallow(
      <Input onChange={() => {}} value="testValue" label="testLabel" />
    );
  });

  it("should render correctly", () => {
    expect(component).toMatchSnapshot();
  });
});
