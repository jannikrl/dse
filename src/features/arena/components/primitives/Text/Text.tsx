import { FunctionComponent, MouseEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { Definition } from "../../../../../types";
import { selectIsInAddingMode } from "../../../../topbar/topbarSlice";
import { mouseOver } from "../../../arenaSlice";
import { usePrimitive3d } from "../../../hooks/usePrimitive3d";
import { usePrimitiveHover } from "../../../hooks/usePrimitiveHover";
import { usePrimitiveSelect } from "../../../hooks/usePrimitiveSelect";
import styles from "./Text.module.css";

interface TextProps {
  definition: Definition;
}

export const Text: FunctionComponent<TextProps> = ({ definition }) => {
  const isInAddingMode = useAppSelector(selectIsInAddingMode);
  const { selectSelf, selectStyles } = usePrimitiveSelect(definition);
  const { hoverStyles } = usePrimitiveHover(definition);
  const { styles3d } = usePrimitive3d(definition);

  const dispatch = useAppDispatch();

  const clickHandler = (event: MouseEvent) => {
    if (isInAddingMode) return;
    selectSelf();
    event.stopPropagation();
  };

  const mouseOverHandler = (event: MouseEvent) => {
    if (isInAddingMode) return;
    dispatch(mouseOver(definition.id));
    event.stopPropagation();
  };

  return (
    <p
      className={styles.root}
      style={{ ...definition.properties, ...selectStyles, ...hoverStyles, ...styles3d }}
      onClick={clickHandler}
      onMouseOver={mouseOverHandler}
    >
      {definition.properties.text}
    </p>
  );
};
