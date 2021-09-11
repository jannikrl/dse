import { Definition } from "../arenaSlice";

export const text: Definition = {
  type: "text",
  id: 1001,
  properties: {
    value: "Type something",
  },
  children: [],
};

export const rectangle: Definition = {
  type: "rectangle",
  id: 1002,
  properties: {
    minWidth: 48,
    minHeight: 48,
    backgroundColor: "#44CCFF",
  },
  children: [],
};
