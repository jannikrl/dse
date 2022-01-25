import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { Definition } from "../../../types";
import {
  selectIsInAddingMode,
  selectSelectedType,
  unselect as topbarUnselect,
} from "../../topbar/topbarSlice";
import { add as arenaAdd } from "../arenaSlice";
import { usePrimitiveCanAddChild } from "./usePrimitiveCanAddChild";

export const usePrimitiveAddChild = (definition: Definition) => {
  const isInAddingMode = useAppSelector(selectIsInAddingMode);
  const selectedType = useAppSelector(selectSelectedType);
  const { canAddChild } = usePrimitiveCanAddChild(definition);

  const dispatch = useAppDispatch();

  const addChild = (index?: number) => {
    if (!isInAddingMode || !canAddChild || !selectedType) return;

    dispatch(
      arenaAdd({
        id: definition.id,
        type: selectedType,
        index: index ?? 0,
      })
    );
    dispatch(topbarUnselect());
  };

  return { addChild };
};
