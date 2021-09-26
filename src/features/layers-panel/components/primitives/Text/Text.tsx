import { FunctionComponent, MouseEvent } from "react";
import { useAppDispatch } from "../../../../../app/hooks";
import { Definition, mouseOver } from "../../../../arena/arenaSlice";
import { usePrimitiveHover } from "../../../hooks/usePrimitiveHover";
import { usePrimitiveSelect } from "../../../hooks/usePrimitiveSelect";
import styles from "./Text.module.css";

interface TextProps {
  definition: Definition;
}

export const Text: FunctionComponent<TextProps> = ({ definition }) => {
  const { selectSelf, selectStyles } = usePrimitiveSelect(definition);
  const { hoverStyles } = usePrimitiveHover(definition);

  const dispatch = useAppDispatch();

  const clickHandler = (event: MouseEvent) => {
    event.stopPropagation();
    selectSelf();
  };

  const mouseOverHandler = (event: MouseEvent) => {
    dispatch(mouseOver(definition.id));
    event.stopPropagation();
  };

  return (
    <p
      className={styles.root}
      style={{
        ...selectStyles,
        ...hoverStyles,
      }}
      onClick={clickHandler}
      onMouseOver={mouseOverHandler}
    >
      - Text:
    </p>
  );
};
