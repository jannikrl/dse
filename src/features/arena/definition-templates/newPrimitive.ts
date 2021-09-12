import { DefinitionType } from "../../../types";
import { newRectangle } from "./newRectangle";
import { newText } from "./newText";

export const newPrimitive = (type: DefinitionType) => {
  switch (type) {
    case "rectangle":
      return newRectangle();
    case "text":
      return newText();
    default:
      return null;
  }
};
