import { Definition } from "../arenaSlice";
import { generateId } from "../utils/generateId";

export const newHStack = () => {
  return {
    type: "hStack",
    id: generateId(),
    properties: {
      minWidth: 48,
      minHeight: 48,
      display: 'flex',
    },
    children: [],
  } as Definition;
};
