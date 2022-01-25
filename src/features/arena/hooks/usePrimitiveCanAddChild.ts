import { Definition} from "../../../types";

export const usePrimitiveCanAddChild = (definition: Definition) => {
  const maxNumberOfChildren = (() => {
    switch (definition.type) {
      case "text":
        return 0;
      case "icon":
        return 0;
      case "rectangle":
        return 1;
      case "hStack":
        return Infinity;
      case "vStack":
        return Infinity;
    }
  })();

  const canAddChild = maxNumberOfChildren
    ? definition.children.length < maxNumberOfChildren
    : true;

  return { canAddChild };
};
