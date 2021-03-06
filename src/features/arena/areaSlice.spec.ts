import { Definition } from "../../types";
import areaReducer, { ArenaState, remove } from "./arenaSlice";

const initialDefinition: Definition = {
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
        text: "Type something",
      },
      children: [],
    },
  ],
};

describe("area reducer", () => {
  const initialState: ArenaState = {
    definition: initialDefinition,
    selectedId: 1004,
    mouseOverId: null,
    isIn3dMode: false,
    isInExpandMode: false,
  };

  it("should remove child", () => {
    const expectedDefinition: Definition = {
      type: "rectangle",
      id: 1003,
      properties: {
        minWidth: 48,
        minHeight: 48,
        backgroundColor: "#44CCFF",
      },
      children: [],
    };
    const actual = areaReducer(initialState, remove());
    expect(actual.definition).toEqual(expectedDefinition);
  });
});
