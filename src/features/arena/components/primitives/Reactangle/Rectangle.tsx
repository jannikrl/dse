import { FunctionComponent, ReactNode, MouseEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import {
  selectIsInAddingMode,
  selectSelectedType,
} from "../../../../topbar/topbarSlice";
import { Definition, mouseOver } from "../../../arenaSlice";
import { usePrimitiveSelect } from "../../../hooks/usePrimitiveSelect";
import { usePrimitiveAddChild } from "../../../hooks/usePrimitiveAddChild";
import { usePrimitiveHover } from "../../../hooks/usePrimitiveHover";
import styles from "./Rectangle.module.css";

interface RectangleProps {
  definition: Definition;
  children: ReactNode;
}

export const Rectangle: FunctionComponent<RectangleProps> = ({
  definition,
  children,
}) => {
  const maxNumberOfChildren = 1;
  const { selectSelf, selectStyles } = usePrimitiveSelect(definition);
  const { hoverStyles, isMouseOver } = usePrimitiveHover(definition);
  const { canAddChild, addChild } = usePrimitiveAddChild(
    definition,
    maxNumberOfChildren
  );
  const isInAddingMode = useAppSelector(selectIsInAddingMode);

  const selectedType = useAppSelector(selectSelectedType);

  const dispatch = useAppDispatch();

  const mouseOverHandler = (event: MouseEvent) => {
    if (isInAddingMode && !canAddChild) return;
    event.stopPropagation();
    dispatch(mouseOver(definition.id));
  };

  const clickHandler = (event: MouseEvent) => {
    if (isInAddingMode && !canAddChild) return;
    event.stopPropagation();
    if (isInAddingMode && canAddChild && selectedType) {
      addChild({ type: selectedType });
      return;
    }
    selectSelf();
  };

  const showDropIndicator = isInAddingMode && isMouseOver && canAddChild;

  return (
    <div
      style={{ ...definition.properties, ...selectStyles, ...hoverStyles }}
      onClick={clickHandler}
      onMouseOver={mouseOverHandler}
      className={styles.root}
    >
      {showDropIndicator && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-2px)",
          }}
        >
          |
        </div>
      )}
      {children}
    </div>
  );
};
