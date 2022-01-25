import { FunctionComponent, ReactNode, MouseEvent } from "react";
import { usePrimitiveCanAddChild } from "../../../hooks/usePrimitiveCanAddChild";
import { usePrimitiveAddChild } from "../../../hooks/usePrimitiveAddChild";
import { selectIsIn3dMode, selectMouseOverId } from "../../../arenaSlice";
import { usePrimitiveSelect } from "../../../hooks/usePrimitiveSelect";
import { selectIsInAddingMode } from "../../../../topbar/topbarSlice";
import { usePrimitiveHover } from "../../../hooks/usePrimitiveHover";
import { DropIndicator } from "../../DropIndicator/DropIndicator";
import { useAppSelector } from "../../../../../app/hooks";
import { selectSelectedId } from "../../../arenaSlice";
import { Definition } from "../../../../../types";
import classNames from "classnames";
import styles from "./Rectangle.module.css";
import arenaStyles from "../../../Arena.module.css";

interface RectangleProps {
  definition: Definition;
  children: ReactNode;
}

export const Rectangle: FunctionComponent<RectangleProps> = ({
  definition,
  children,
}) => {
  const selectedId = useAppSelector(selectSelectedId);
  const isIn3dMode = useAppSelector(selectIsIn3dMode);
  const mouseOverId = useAppSelector(selectMouseOverId);
  const isInAddingMode = useAppSelector(selectIsInAddingMode);

  const { select } = usePrimitiveSelect(definition);
  const { mouseOver } = usePrimitiveHover(definition);
  const { addChild } = usePrimitiveAddChild(definition);
  const { canAddChild } = usePrimitiveCanAddChild(definition);

  const mouseOverHandler = (event: MouseEvent) => {
    mouseOver();
    event.stopPropagation();
  };

  const clickHandler = (event: MouseEvent) => {
    select();
    addChild();
    event.stopPropagation();
  };

  const isSelected = selectedId === definition.id;
  const isMouseOver = mouseOverId === definition.id;
  const showDropIndicator = isInAddingMode && isMouseOver && canAddChild;

  return (
    <div
      className={classNames(styles.root, arenaStyles.primitive3d, {
        [arenaStyles.hover]: isMouseOver,
        [arenaStyles.active]: isIn3dMode,
        [arenaStyles.selected]: isSelected,
      })}
      style={{
        ...definition.properties,
      }}
      onClick={clickHandler}
      onMouseOver={mouseOverHandler}
    >
      {showDropIndicator && <DropIndicator style={{ left: "50%" }} />}
      {children}
    </div>
  );
};
