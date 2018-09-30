/* eslint-env jest */

import React from "react";
import { shallow } from "enzyme";

import { Spinner } from ".";

describe("Spinner", () => {
  let component;

  beforeEach(() => {
    component = shallow(<Spinner />);
  });

  it("should render correctly", () => {
    expect(component).toMatchSnapshot();
  });
});
