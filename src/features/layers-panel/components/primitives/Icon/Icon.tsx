import { FunctionComponent, MouseEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { selectIsInAddingMode } from "../../../../topbar/topbarSlice";
import { Definition, mouseOver } from "../../../../arena/arenaSlice";
import { usePrimitiveHover } from "../../../hooks/usePrimitiveHover";
import { usePrimitiveSelect } from "../../../hooks/usePrimitiveSelect";
import styles from "./Icon.module.css";

interface IconProps {
  definition: Definition;
}

export const Icon: FunctionComponent<IconProps> = ({ definition }) => {
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
    <div
      className={styles.root}
      style={{ ...selectStyles, ...hoverStyles }}
      onClick={clickHandler}
      onMouseOver={mouseOverHandler}
    >
      - Icon
    </div>
  );
};
