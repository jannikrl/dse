import { FunctionComponent, ReactNode, MouseEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { selectSelectedType } from "../../../../topbar/topbarSlice";
import { Definition, mouseOver } from "../../../arenaSlice";
import { usePrimitiveSelect } from "../../../hooks/usePrimitiveSelect";
import { usePrimitiveAdd } from "../../../hooks/usePrimitiveAdd";
import { usePrimitiveHover } from "../../../hooks/usePrimitiveHover";

interface RectangleProps {
  definition: Definition;
  children: ReactNode;
}

export const Rectangle: FunctionComponent<RectangleProps> = ({
  definition,
  children,
}) => {
  const { selectSelf, selectStyles } = usePrimitiveSelect(definition);
  const { hoverStyles } = usePrimitiveHover(definition);
  const { showDropIndicator, canAdd, add } = usePrimitiveAdd(definition);
  
  const selectedType = useAppSelector(selectSelectedType);

  const dispatch = useAppDispatch();

  const mouseOverHandler = (event: MouseEvent) => {
    dispatch(mouseOver(definition.id));
    event.stopPropagation();
  };

  const clickHandler = (event: MouseEvent) => {
    if (canAdd && selectedType) {
      add(selectedType);
      return;
    }
    selectSelf(event);
  };

  return (
    <div
      style={{ ...definition.properties, ...selectStyles, ...hoverStyles }}
      onClick={clickHandler}
      onMouseOver={mouseOverHandler}
    >
      {showDropIndicator && <div>|</div>}
      {children}
    </div>
  );
};
