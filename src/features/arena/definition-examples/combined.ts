import { Definition } from "../arenaSlice";

export const combined: Definition = {
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
  ],
};
