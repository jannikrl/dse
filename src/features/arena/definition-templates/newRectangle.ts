import { Definition } from "../arenaSlice";
import { generateId } from "../utils/generateId";

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
