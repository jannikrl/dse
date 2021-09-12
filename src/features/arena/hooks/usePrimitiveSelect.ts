import { MouseEvent, CSSProperties } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { Definition, select as areaSelect, selectSelectedId } from "../arenaSlice";
import { unselect } from "../../topbar/topbarSlice";
import { getCssVariable } from "../../../utils/getCssVariable";

export const usePrimitiveSelect = (definition: Definition) => {
  const selectedId = useAppSelector(selectSelectedId);
  
  const dispatch = useAppDispatch();

  const selectSelf = (event: MouseEvent) => {
    dispatch(areaSelect(definition.id));
    dispatch(unselect());
    event.stopPropagation();
  };

  const selectStyles: CSSProperties =
    selectedId === definition.id
      ? { outline: `1px solid ${getCssVariable("--primary-500")}` }
      : {};

  return { selectSelf, selectStyles };
};
