import { Definition } from "../../../types";
import { generateId } from "../utils/generateId";

export const newRectangle = () => {
  return {
    type: "rectangle",
    id: generateId(),
    properties: {
      paddingTop: 16,
      paddingRight: 16,
      paddingBottom: 16,
      paddingLeft: 16,
      backgroundColor: "#44CCFF",
      borderRadius: 0,
    },
    children: [],
  } as Definition;
};
