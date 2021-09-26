import { FunctionComponent, ReactNode, MouseEvent } from "react";
import { useAppDispatch } from "../../../../../app/hooks";
import { Definition, mouseOver } from "../../../../arena/arenaSlice";
import { usePrimitiveSelect } from "../../../hooks/usePrimitiveSelect";
import { usePrimitiveHover } from "../../../hooks/usePrimitiveHover";
import styles from "./Rectangle.module.css";

interface RectangleProps {
  definition: Definition;
  children: ReactNode;
}

export const Rectangle: FunctionComponent<RectangleProps> = ({
  definition,
  children,
}) => {
  const { selectSelf, selectStyles } = usePrimitiveSelect(definition);
  const { hoverStyles } = usePrimitiveHover(definition);

  const dispatch = useAppDispatch();

  const mouseOverHandler = (event: MouseEvent) => {
    event.stopPropagation();
    dispatch(mouseOver(definition.id));
  };

  const clickHandler = (event: MouseEvent) => {
    event.stopPropagation();
    selectSelf();
  };

  return (
    <>
      <div
        style={{
          ...selectStyles,
          ...hoverStyles,
        }}
        onClick={clickHandler}
        onMouseOver={mouseOverHandler}
        className={styles.root}
      >
        -Rectangle
      </div>
      <div className={styles.children}>{children}</div>
    </>
  );
};
