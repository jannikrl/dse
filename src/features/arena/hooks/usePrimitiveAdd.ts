import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { DefinitionType } from "../../../types";
import {
  selectIsInAddingMode,
  unselect as topbarUnselect,
} from "../../topbar/topbarSlice";
import { add as arenaAdd, Definition } from "../arenaSlice";

export const usePrimitiveAdd = (
  definition: Definition,
  maxNumberOfChildren: number | null = null
) => {
  const isInAddingMode = useAppSelector(selectIsInAddingMode);

  const isAvailableForDrop = maxNumberOfChildren
    ? definition.children.length < maxNumberOfChildren
    : true;
  const canAdd = isInAddingMode && isAvailableForDrop;

  const dispatch = useAppDispatch();

  const add = (type: DefinitionType) => {
    dispatch(arenaAdd({ id: definition.id, type: type }));
    dispatch(topbarUnselect());
  };

  return { canAdd, add };
};
