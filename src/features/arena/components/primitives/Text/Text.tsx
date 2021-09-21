import { FunctionComponent, MouseEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { selectIsInAddingMode } from "../../../../topbar/topbarSlice";
import { Definition, mouseOver } from "../../../arenaSlice";
import { usePrimitiveHover } from "../../../hooks/usePrimitiveHover";
import { usePrimitiveSelect } from "../../../hooks/usePrimitiveSelect";
import styles from "./Text.module.css";

interface RectangleProps {
  definition: Definition;
}

export const Text: FunctionComponent<RectangleProps> = ({ definition }) => {
  const isInAddingMode = useAppSelector(selectIsInAddingMode);
  const { selectSelf, selectStyles } = usePrimitiveSelect(definition);
  const { hoverStyles } = usePrimitiveHover(definition);

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
      style={{ ...definition.properties, ...selectStyles, ...hoverStyles }}
      onClick={clickHandler}
      onMouseOver={mouseOverHandler}
    >
      {definition.properties.text}
    </p>
  );
};
