import { Definition } from "../arenaSlice";
import { generateId } from "../utils/generateId";

export const newText = () => {
  return {
    type: "text",
    id: generateId(),
    properties: {
      text: "Type something",
      color: "#111111"
    },
    children: [],
  } as Definition;
};
