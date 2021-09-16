import { Definition } from "../arenaSlice";

const generateId = () => Math.round(Math.random() * 1000000000);

export const newText = () => {
  return {
    type: "text",
    id: generateId(),
    properties: {
      text: "Type something",
      color: "111111"
    },
    children: [],
  } as Definition;
};
