import { CSSProperties } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  Definition,
  select as areaSelect,
  selectSelectedId,
} from "../../arena/arenaSlice";
import { unselect } from "../../topbar/topbarSlice";
import { getCssVariable } from "../../../utils/getCssVariable";

export const usePrimitiveSelect = (definition: Definition) => {
  const selectedId = useAppSelector(selectSelectedId);

  const dispatch = useAppDispatch();

  const selectSelf = () => {
    dispatch(areaSelect(definition.id));
    dispatch(unselect());
  };

  const selectStyles: CSSProperties =
    selectedId === definition.id
      ? {
          outline: `solid 1px ${getCssVariable("--primary-500")}`,
          outlineOffset: "0px",
        }
      : {};

  return { selectSelf, selectStyles };
};
