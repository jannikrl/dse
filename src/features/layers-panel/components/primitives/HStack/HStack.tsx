import { FunctionComponent, ReactNode, MouseEvent, useRef } from "react";
import { useAppDispatch } from "../../../../../app/hooks";
import { Definition, mouseOver } from "../../../../arena/arenaSlice";
import { usePrimitiveSelect } from "../../../hooks/usePrimitiveSelect";
import { usePrimitiveHover } from "../../../hooks/usePrimitiveHover";
import styles from "./HStack.module.css";

interface HStackProps {
  definition: Definition;
  children: ReactNode;
}

export const HStack: FunctionComponent<HStackProps> = ({
  definition,
  children,
}) => {
  const hStackRef = useRef(null);
  const { selectSelf, selectStyles } = usePrimitiveSelect(definition);
  const { hoverStyles } = usePrimitiveHover(definition);

  const dispatch = useAppDispatch();

  const mouseOverHandler = (event: MouseEvent) => {
    dispatch(mouseOver(definition.id));
    event.stopPropagation();
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
        ref={hStackRef}
        className={styles.root}
      >
        - HStack
      </div>
      <div className={styles.children}>{children}</div>
    </>
  );
};
