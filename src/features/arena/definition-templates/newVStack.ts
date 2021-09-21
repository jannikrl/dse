import { Definition } from "../arenaSlice";
import { generateId } from "../utils/generateId";

export const newVStack = () => {
  return {
    type: "vStack",
    id: generateId(),
    properties: {
      minWidth: 48,
      minHeight: 48,
      display: 'flex',
      flexDirection: 'column',
    },
    children: [],
  } as Definition;
};
