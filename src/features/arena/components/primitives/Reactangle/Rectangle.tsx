import { FunctionComponent, ReactNode, MouseEvent } from "react";
import { useAppSelector } from "../../../../../app/hooks";
import { selectIsInAddingMode } from "../../../../topbar/topbarSlice";
import { selectIsIn3dMode, selectMouseOverId } from "../../../arenaSlice";
import { usePrimitiveSelect } from "../../../hooks/usePrimitiveSelect";
import { usePrimitiveAddChild } from "../../../hooks/usePrimitiveAddChild";
import { usePrimitiveCanAddChild } from "../../../hooks/usePrimitiveCanAddChild";
import styles from "./Rectangle.module.css";
import { DropIndicator } from "../../DropIndicator/DropIndicator";
import { Definition } from "../../../../../types";
import { selectSelectedId } from "../../../arenaSlice";
import classNames from "classnames";
import arenaStyles from "../../../Arena.module.css";
import { usePrimitiveHover } from "../../../hooks/usePrimitiveHover";

interface RectangleProps {
  definition: Definition;
  children: ReactNode;
}

export const Rectangle: FunctionComponent<RectangleProps> = ({
  definition,
  children,
}) => {
  const selectedId = useAppSelector(selectSelectedId);
  const mouseOverId = useAppSelector(selectMouseOverId);
  const isIn3dMode = useAppSelector(selectIsIn3dMode);
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
    addChild();
    select();
    event.stopPropagation();
  };

  const isMouseOver = mouseOverId === definition.id;
  const isSelected = selectedId === definition.id;
  const showDropIndicator = isInAddingMode && isMouseOver && canAddChild;

  return (
    <div
      className={classNames(styles.root, arenaStyles.primitive3d, {
        [arenaStyles.selected]: isSelected,
        [arenaStyles.hover]: isMouseOver,
        [arenaStyles.active]: isIn3dMode,
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
