import { Definition } from "../../arenaSlice";
import { loop } from "./loop";

const definition: Definition = {
  type: "rectangle",
  id: 1003,
  properties: {
    minWidth: 48,
    minHeight: 48,
    backgroundColor: "#44CCFF",
  },
  children: [
    {
      type: "text",
      id: 1004,
      properties: {
        value: "Type something",
      },
      children: [],
    },
    {
        type: "text",
        id: 1005,
        properties: {
          value: "Type something",
        },
        children: [],
      },
  ],
};

describe("Arena/Util/Loop", () => {
  xtest("Loop finds root", () => {
    const result = loop(1003, definition);
    expect(result?.target.id).toEqual(1003);
  });

  test("Loop finds child", () => {
    const result = loop(1004, definition);
    expect(result?.target.id).toEqual(1004);
  });

  test("Loop returns null if no match found", () => {
    const result = loop(9999, definition);
    expect(result).toEqual(null);
  });
});
