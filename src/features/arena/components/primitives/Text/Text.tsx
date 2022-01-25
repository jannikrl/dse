import { FunctionComponent, MouseEvent } from "react";
import { useAppSelector } from "../../../../../app/hooks";
import { Definition } from "../../../../../types";
import { selectIsIn3dMode } from "../../../arenaSlice";
import { usePrimitiveSelect } from "../../../hooks/usePrimitiveSelect";
import { selectSelectedId, selectMouseOverId } from "../../../arenaSlice";
import { usePrimitiveHover } from "../../../hooks/usePrimitiveHover";
import classNames from "classnames";
import arenaStyles from "../../../Arena.module.css";
import styles from "./Text.module.css";

interface TextProps {
  definition: Definition;
}

export const Text: FunctionComponent<TextProps> = ({ definition }) => {
  const selectedId = useAppSelector(selectSelectedId);
  const mouseOverId = useAppSelector(selectMouseOverId);
  const isIn3dMode = useAppSelector(selectIsIn3dMode);

  const { select } = usePrimitiveSelect(definition);
  const { mouseOver } = usePrimitiveHover(definition);

  const clickHandler = (event: MouseEvent) => {
    select();
    event.stopPropagation();
  };

  const mouseOverHandler = (event: MouseEvent) => {
    mouseOver();
    event.stopPropagation();
  };

  const isSelected = selectedId === definition.id;
  const isMouseOver = mouseOverId === definition.id;

  return (
    <p
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
      {definition.properties.text}
    </p>
  );
};
