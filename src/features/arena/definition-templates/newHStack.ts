import { Definition } from "../../../types";
import { generateId } from "../utils/generateId";

export const newHStack = () => {
  return {
    type: "hStack",
    id: generateId(),
    properties: {
    },
    children: [],
  } as Definition;
};
