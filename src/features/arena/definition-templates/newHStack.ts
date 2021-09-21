import { Definition } from "../arenaSlice";
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
