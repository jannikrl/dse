import { DefinitionType } from "../../../types";
import { newRectangle } from "./newRectangle";
import { newText } from "./newText";
import { newHStack } from "./newHStack";

export const newPrimitive = (type: DefinitionType) => {
  switch (type) {
    case "rectangle":
      return newRectangle();
    case "text":
      return newText();
    case "hStack":
      return newHStack();
    default:
      return null;
  }
};
