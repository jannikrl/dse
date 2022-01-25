import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { mouseOver as mouseOverDefinitionId } from "../arenaSlice";
import { Definition } from "../../../types";
import { selectIsInAddingMode } from "../../topbar/topbarSlice";
import { usePrimitiveCanAddChild } from "./usePrimitiveCanAddChild";

export const usePrimitiveHover = (definition: Definition) => {
  const isInAddingMode = useAppSelector(selectIsInAddingMode);
  const { canAddChild } = usePrimitiveCanAddChild(definition);

  const dispatch = useAppDispatch();

  const mouseOver = () => {
    if (isInAddingMode && !canAddChild) return;
    dispatch(mouseOverDefinitionId(definition.id));
  };

  return { mouseOver };
};
