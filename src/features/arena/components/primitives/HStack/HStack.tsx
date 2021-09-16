import {
  FunctionComponent,
  ReactNode,
  MouseEvent,
  useRef,
} from "react";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { selectSelectedType } from "../../../../topbar/topbarSlice";
import { Definition, mouseOver } from "../../../arenaSlice";
import { usePrimitiveSelect } from "../../../hooks/usePrimitiveSelect";
import { usePrimitiveAdd } from "../../../hooks/usePrimitiveAdd";
import { usePrimitiveHover } from "../../../hooks/usePrimitiveHover";
import { useDropIndicator } from "../../../hooks/useDropIndicator";

interface HStackProps {
  definition: Definition;
  children: ReactNode;
}

export const HStack: FunctionComponent<HStackProps> = ({
  definition,
  children,
}) => {
  const ref = useRef(null);
  const { selectSelf, selectStyles } = usePrimitiveSelect(definition);
  const { isMouseOver, hoverStyles } = usePrimitiveHover(definition);
  const { canAdd, add } = usePrimitiveAdd(definition);
  const { dropIndicatorPosition, dropIndex } = useDropIndicator(ref);
  const showDropIndicator = isMouseOver && canAdd;
  // Drop position

  // Drop indicator position
  // Drop index

  // End

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
      ref={ref}
    >
      {showDropIndicator && <div>|</div>}
      {children}
    </div>
  );
};
