import { FunctionComponent, ReactNode, MouseEvent, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import {
  selectIsInAddingMode,
  selectSelectedType,
} from "../../../../topbar/topbarSlice";
import {
  mouseOver,
  selectIsInExpandMode,
} from "../../../arenaSlice";
import { usePrimitiveSelect } from "../../../hooks/usePrimitiveSelect";
import { usePrimitiveAddChild } from "../../../hooks/usePrimitiveAddChild";
import { usePrimitiveHover } from "../../../hooks/usePrimitiveHover";
import { useStackDropIndicatorPosition } from "../../../hooks/useStackDropIndicatorPosition";
import styles from "./VStack.module.css";
import { DropIndicator } from "../../DropIndicator/DropIndicator";
import classNames from "classnames";
import { EmptyStackPlaceholder } from "../../EmptyStackPlaceholder/EmptyStackPlaceholder";
import { usePrimitive3d } from "../../../hooks/usePrimitive3d";
import { Definition } from "../../../../../types";

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
  const selectedType = useAppSelector(selectSelectedType);
  const { selectSelf, selectStyles } = usePrimitiveSelect(definition);
  const { isMouseOver, hoverStyles } = usePrimitiveHover(definition);
  const { canAddChild, addChild } = usePrimitiveAddChild(definition);
  const { styles3d } = usePrimitive3d(definition);
  const { dropIndicatorPosition, dropIndex, mouseMove, transitionEnd } =
    useStackDropIndicatorPosition(
      "vStack",
      hStackRef,
      dropIndicatorRef,
      placeholderRef
    );

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
  const hasNoChildren = definition.children.length === 0;

  return (
    <div
      style={{
        ...definition.properties,
        ...selectStyles,
        ...hoverStyles,
        ...styles3d,
      }}
      onClick={clickHandler}
      onMouseOver={mouseOverHandler}
      onMouseMove={mouseMove}
      onTransitionEnd={transitionEnd}
      ref={hStackRef}
      className={classNames(styles.root, {
        [styles.empty]: hasNoChildren,
        [styles.expand]: isInExpandMode,
      })}
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
