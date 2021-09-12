import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { DefinitionType } from "../../../types";
import {
  selectIsInAddingMode,
  unselect as topbarUnselect,
} from "../../topbar/topbarSlice";
import { add as arenaAdd, Definition, selectMouseOverId } from "../arenaSlice";

export const usePrimitiveAdd = (definition: Definition) => {
  const isInAddingMode = useAppSelector(selectIsInAddingMode);
  const mouseOverId = useAppSelector(selectMouseOverId);

  const maxNumberOfChildren = 1;
  const isAvailableForDrop = definition.children.length < maxNumberOfChildren;
  const isMouseOver = mouseOverId === definition.id;

  const showDropIndicator = isInAddingMode && isMouseOver && isAvailableForDrop;

  const canAdd = isInAddingMode && isAvailableForDrop;

  const dispatch = useAppDispatch();

  const add = (type: DefinitionType) => {
    dispatch(arenaAdd({ id: definition.id, type: type }));
    dispatch(topbarUnselect());
  };

  return { showDropIndicator, canAdd, add };
};
