/* eslint-env jest */

import React from "react";
import { shallow } from "enzyme";

import { EditableEntityFormPresentational } from ".";

const renderFn = jest.fn();
const changeFn = jest.fn();
const saveFn = jest.fn();

describe("EditableEntityForm", () => {
  let component;

  beforeEach(() => {
    component = shallow(
      <EditableEntityFormPresentational change={changeFn} save={saveFn}>
        {renderFn}
      </EditableEntityFormPresentational>
    );
  });

  afterEach(() => {
    renderFn.mockClear();
    changeFn.mockClear();
    saveFn.mockClear();
  });

  it("should call the render function correctly", () => {
    const { handleChange, handleChangeAndSave } = renderFn.mock.calls[0][0];
    expect(handleChange).toBeDefined();
    expect(handleChangeAndSave).toBeDefined();
  });

  it("should call change method with correct payload when using handleChange", async () => {
    await component.instance().handleChange({
      target: {
        dataset: {
          propPath: "prop.path"
        },
        value: "changed value"
      }
    });
    expect(changeFn.mock.calls[0][0]).toBe("prop.path");
    expect(changeFn.mock.calls[0][1]).toBe("changed value");
  });
});
