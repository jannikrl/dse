import { Definition } from "../../../types";
import { generateId } from "../utils/generateId";

export const newVStack = () => {
  return {
    type: "vStack",
    id: generateId(),
    properties: {

    },
    children: [],
  } as Definition;
};
