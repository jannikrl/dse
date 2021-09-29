import { Definition } from "../../../types";
import { generateId } from "../utils/generateId";

export const newIcon = () => {
  return {
    type: "icon",
    id: generateId(),
    properties: {
      color: "#000"
    },
    children: [],
  } as Definition;
};
