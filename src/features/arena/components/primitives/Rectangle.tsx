import { FunctionComponent, ReactNode, MouseEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import {
  selectIsInAddingMode,
  selectSelectedType,
} from "../../../topbar/topbarSlice";
import {
  add,
  Definition,
  mouseOver,
  selectMouseOverId,
} from "../../arenaSlice";
import { usePrimitiveDynamicStyles } from "../../hooks/usePrimitiveDynamicStyles";
import { usePrimitiveSelect } from "../../hooks/usePrimitiveSelect";

interface RectangleProps {
  definition: Definition;
  children: ReactNode;
}

export const Rectangle: FunctionComponent<RectangleProps> = ({
  definition,
  children,
}) => {
  const { selectSelf } = usePrimitiveSelect(definition);
  const { dynamicStyles } = usePrimitiveDynamicStyles(definition);

  const isInAddingMode = useAppSelector(selectIsInAddingMode);
  const mouseOverId = useAppSelector(selectMouseOverId);
  const selectedType = useAppSelector(selectSelectedType);

  const maxNumberOfChildren = 1;
  const isAvailableForDrop = definition.children.length < maxNumberOfChildren;
  const isMouseOver = mouseOverId === definition.id;

  const showDropIndicator = isInAddingMode && isMouseOver && isAvailableForDrop;

  const dispatch = useAppDispatch();

  const mouseOverHandler = (event: MouseEvent) => {
    dispatch(mouseOver(definition.id));
    event.stopPropagation();
  };

  const clickHandler = (event: MouseEvent) => {
    if (isInAddingMode && isAvailableForDrop && selectedType) {
      dispatch(add({ id: definition.id, type: selectedType }));
      return;
    }
    selectSelf(event);
  };

  return (
    <div
      style={{ ...definition.properties, ...dynamicStyles }}
      onClick={clickHandler}
      onMouseOver={mouseOverHandler}
    >
      {showDropIndicator && <div>|</div>}
      {children}
    </div>
  );
};
