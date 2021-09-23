import { DefinitionType } from "../../../types";
import { newRectangle } from "./newRectangle";
import { newText } from "./newText";
import { newHStack } from "./newHStack";
import { newVStack } from "./newVStack";
import { newIcon } from "./newIcon";

export const newPrimitive = (type: DefinitionType) => {
  switch (type) {
    case "rectangle":
      return newRectangle();
    case "text":
      return newText();
    case "hStack":
      return newHStack();
    case "vStack":
      return newVStack();
    case "icon":
      return newIcon();
    default:
      return null;
  }
};
