import { FunctionComponent, MouseEvent } from "react";
import { useAppDispatch } from "../../../../../app/hooks";
import { Definition, mouseOver } from "../../../arenaSlice";
import { usePrimitiveHover } from "../../../hooks/usePrimitiveHover";
import { usePrimitiveSelect } from "../../../hooks/usePrimitiveSelect";
import styles from "./Text.module.css";

interface RectangleProps {
  definition: Definition;
}

export const Text: FunctionComponent<RectangleProps> = ({ definition }) => {
  const { selectSelf, selectStyles } = usePrimitiveSelect(definition);
  const { hoverStyles } = usePrimitiveHover(definition);

  const dispatch = useAppDispatch();

  const mouseOverHandler = (event: MouseEvent) => {
    dispatch(mouseOver(definition.id));
    event.stopPropagation();
  };

  return (
    <p
      className={styles.root} 
      style={{ ...definition.properties, ...selectStyles, ...hoverStyles }}
      onClick={selectSelf}
      onMouseOver={mouseOverHandler}
    >
      {definition.properties.text}
    </p>
  );
};
