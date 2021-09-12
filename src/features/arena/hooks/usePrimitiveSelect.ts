import { MouseEvent } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { Definition, select as areaSelect } from "../arenaSlice";
import { unselect } from "../../topbar/topbarSlice";

export const usePrimitiveSelect = (definition: Definition) => {
  const dispatch = useAppDispatch();

  const selectSelf = (event: MouseEvent) => {
    dispatch(areaSelect(definition.id));
    dispatch(unselect());
    event.stopPropagation();
  };

  return { selectSelf };
};
