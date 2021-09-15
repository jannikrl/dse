import { Definition } from "../arenaSlice";

const generateId = () => Math.round(Math.random() * 1000000000);

export const newText = () => {
  return {
    type: "text",
    id: generateId(),
    properties: {
      text: "Type something",
    },
    children: [],
  } as Definition;
};
