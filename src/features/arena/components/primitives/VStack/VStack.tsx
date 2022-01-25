import { FunctionComponent, ReactNode, MouseEvent, useRef } from "react";
import { useAppSelector } from "../../../../../app/hooks";
import {
  selectIsInAddingMode,
} from "../../../../topbar/topbarSlice";
import {
  selectIsIn3dMode,
  selectIsInExpandMode,
  selectMouseOverId,
  selectSelectedId,
} from "../../../arenaSlice";
import { usePrimitiveSelect } from "../../../hooks/usePrimitiveSelect";
import { usePrimitiveAddChild } from "../../../hooks/usePrimitiveAddChild";
import { usePrimitiveHover } from "../../../hooks/usePrimitiveHover";
import { useStackDropIndicatorPosition } from "../../../hooks/useStackDropIndicatorPosition";
import styles from "./VStack.module.css";
import { DropIndicator } from "../../DropIndicator/DropIndicator";
import classNames from "classnames";
import { EmptyStackPlaceholder } from "../../EmptyStackPlaceholder/EmptyStackPlaceholder";
import { Definition } from "../../../../../types";
import arenaStyles from "../../../Arena.module.css";
import { usePrimitiveCanAddChild } from "../../../hooks/usePrimitiveCanAddChild";

interface HStackProps {
  definition: Definition;
  children: ReactNode;
}

export const VStack: FunctionComponent<HStackProps> = ({
  definition,
  children,
}) => {
  const hStackRef = useRef(null);
  const dropIndicatorRef = useRef(null);
  const placeholderRef = useRef(null);
  
  const isInAddingMode = useAppSelector(selectIsInAddingMode);
  const isInExpandMode = useAppSelector(selectIsInExpandMode);
  const isIn3dMode = useAppSelector(selectIsIn3dMode);
  const selectedId = useAppSelector(selectSelectedId);
  const mouseOverId = useAppSelector(selectMouseOverId);

  const { select } = usePrimitiveSelect(definition);
  const { mouseOver } = usePrimitiveHover(definition);
  const { addChild } = usePrimitiveAddChild(definition);
  const { canAddChild } = usePrimitiveCanAddChild(definition);
  const { dropIndicatorPosition, dropIndex, mouseMove, update } =
    useStackDropIndicatorPosition(
      "vStack",
      hStackRef,
      dropIndicatorRef,
      placeholderRef
    );

  const mouseOverHandler = (event: MouseEvent) => {
    mouseOver();
    event.stopPropagation();
  };

  const clickHandler = (event: MouseEvent) => {
    addChild(dropIndex);
    select();
    event.stopPropagation();
  };

  const isMouseOver = mouseOverId === definition.id;
  const isSelected = selectedId === definition.id;
  const showDropIndicator = isInAddingMode && isMouseOver && canAddChild;
  const hasNoChildren = definition.children.length === 0;

  return (
    <div
      className={classNames(styles.root, arenaStyles.primitive3d, {
        [styles.empty]: hasNoChildren,
        [styles.expand]: isInExpandMode,
        [arenaStyles.selected]: isSelected,
        [arenaStyles.hover]: isMouseOver,
        [arenaStyles.active]: isIn3dMode && isInExpandMode,
      })}
      style={{
        ...definition.properties,
      }}
      onClick={clickHandler}
      onMouseOver={mouseOverHandler}
      onMouseMove={mouseMove}
      onTransitionEnd={update}
      ref={hStackRef}
    >
      {hasNoChildren && (
        <EmptyStackPlaceholder type="vStack" ref={placeholderRef} />
      )}
      {showDropIndicator && (
        <DropIndicator
          style={{
            top: dropIndicatorPosition ?? "50%",
          }}
          isVertical
          ref={dropIndicatorRef}
        />
      )}
      {children}
    </div>
  );
};
