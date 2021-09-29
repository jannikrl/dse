import { Definition } from "../../../types";
import { generateId } from "../utils/generateId";

export const newText = () => {
  return {
    type: "text",
    id: generateId(),
    properties: {
      text: "Type something",
      color: "#111111",
      fontSize: 14,
      fontWeight: 400,
      letterSpacing: 0,
    },
    children: [],
  } as Definition;
};
