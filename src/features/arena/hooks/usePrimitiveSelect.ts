import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { select as areaSelect } from "../arenaSlice";
import { selectIsInAddingMode, unselect } from "../../topbar/topbarSlice";
import { Definition } from "../../../types";
import { usePrimitiveCanAddChild } from "./usePrimitiveCanAddChild";

export const usePrimitiveSelect = (definition: Definition) => {
  const isInAddingMode = useAppSelector(selectIsInAddingMode);
  const { canAddChild } = usePrimitiveCanAddChild(definition);

  const dispatch = useAppDispatch();

  const select = () => {
    if (isInAddingMode && !canAddChild) return;
    dispatch(areaSelect(definition.id));
    dispatch(unselect());
  };

  return { select };
};
