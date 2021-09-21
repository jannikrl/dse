import { useAppDispatch } from "../../../app/hooks";
import { DefinitionType } from "../../../types";
import { unselect as topbarUnselect } from "../../topbar/topbarSlice";
import { add as arenaAdd, Definition } from "../arenaSlice";

export const usePrimitiveAddChild = (
  definition: Definition,
  maxNumberOfChildren: number | null = null
) => {
  const canAddChild = maxNumberOfChildren
    ? definition.children.length < maxNumberOfChildren
    : true;

  const dispatch = useAppDispatch();

  const addChild = (options: { type: DefinitionType; index?: number }) => {
    dispatch(
      arenaAdd({
        id: definition.id,
        type: options.type,
        index: options.index ?? 0,
      })
    );
    dispatch(topbarUnselect());
  };

  return { canAddChild, addChild };
};
