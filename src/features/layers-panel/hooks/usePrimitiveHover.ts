import { CSSProperties } from "react";
import { useAppSelector } from "../../../app/hooks";
import { Definition, selectMouseOverId } from "../../arena/arenaSlice";
import { getCssVariable } from "../../../utils/getCssVariable";

export const usePrimitiveHover = (definition: Definition) => {
  const mouseOverId = useAppSelector(selectMouseOverId);
  const isMouseOver = mouseOverId === definition.id;

  const hoverStyles: CSSProperties = isMouseOver
    ? {
        outline: `1px solid ${getCssVariable("--primary-500")}`,
        outlineOffset: "0px",
      }
    : {
        outline: 'none',
      };

  return { hoverStyles, isMouseOver };
};
