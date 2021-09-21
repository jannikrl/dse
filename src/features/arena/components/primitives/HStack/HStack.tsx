import { FunctionComponent, ReactNode, MouseEvent, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import {
  selectIsInAddingMode,
  selectSelectedType,
} from "../../../../topbar/topbarSlice";
import { Definition, mouseOver } from "../../../arenaSlice";
import { usePrimitiveSelect } from "../../../hooks/usePrimitiveSelect";
import { usePrimitiveAddChild } from "../../../hooks/usePrimitiveAddChild";
import { usePrimitiveHover } from "../../../hooks/usePrimitiveHover";
import { useStackDropIndicatorPosition } from "../../../hooks/useStackDropIndicatorPosition";
import styles from "./HStack.module.css";
import { DropIndicator } from "../../DropIndicator/DropIndicator";

interface HStackProps {
  definition: Definition;
  children: ReactNode;
}

export const HStack: FunctionComponent<HStackProps> = ({
  definition,
  children,
}) => {
  const hStackRef = useRef(null);
  const dropIndicatorRef = useRef(null);
  const isInAddingMode = useAppSelector(selectIsInAddingMode);
  const selectedType = useAppSelector(selectSelectedType);
  const { selectSelf, selectStyles } = usePrimitiveSelect(definition);
  const { isMouseOver, hoverStyles } = usePrimitiveHover(definition);
  const { canAddChild, addChild } = usePrimitiveAddChild(definition);
  const { dropIndicatorPosition, dropIndex, mouseMove } =
    useStackDropIndicatorPosition(hStackRef, dropIndicatorRef, "hStack");

  const dispatch = useAppDispatch();

  const mouseOverHandler = (event: MouseEvent) => {
    dispatch(mouseOver(definition.id));
    event.stopPropagation();
  };

  const clickHandler = (event: MouseEvent) => {
    event.stopPropagation();
    if (isInAddingMode && canAddChild && selectedType) {
      addChild({ type: selectedType, index: dropIndex });
      return;
    }
    selectSelf();
  };

  const showDropIndicator = isInAddingMode && isMouseOver && canAddChild;

  return (
    <div
      style={{
        ...definition.properties,
        ...selectStyles,
        ...hoverStyles,
      }}
      onClick={clickHandler}
      onMouseOver={mouseOverHandler}
      onMouseMove={mouseMove}
      ref={hStackRef}
      className={styles.root}
    >
      {showDropIndicator && (
        <DropIndicator
          style={{ left: dropIndicatorPosition ?? "50%" }}
          ref={dropIndicatorRef}
        />
      )}
      {children}
    </div>
  );
};