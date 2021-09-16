import { Definition } from "../arenaSlice";

const generateId = () => Math.round(Math.random() * 1000000000);

export const newRectangle = () => {
  return {
    type: "rectangle",
    id: generateId(),
    properties: {
      minWidth: 48,
      minHeight: 48,
      backgroundColor: "#44CCFF",
      borderRadius: 0,
    },
    children: [],
  } as Definition;
};
