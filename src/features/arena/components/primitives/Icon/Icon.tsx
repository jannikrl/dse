import { FunctionComponent, MouseEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { Definition } from "../../../../../types";
import { selectIsInAddingMode } from "../../../../topbar/topbarSlice";
import { mouseOver } from "../../../arenaSlice";
import { usePrimitive3d } from "../../../hooks/usePrimitive3d";
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
    <div
      className={styles.root}
      style={{ ...definition.properties, ...selectStyles, ...hoverStyles, ...styles3d }}
      onClick={clickHandler}
      onMouseOver={mouseOverHandler}
    >
      {
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="11"
          height="14"
          viewBox="0 0 11 14"
        >
          <g
            fill="none"
            fillRule="evenodd"
            stroke="none"
            strokeLinejoin="round"
            strokeWidth="1"
          >
            <path
              fill="currentColor"
              stroke="currentColor"
              d="M5.65 1.967l6.45 9.383H-.8l6.45-9.383z"
              transform="rotate(90 5.65 6.85)"
            ></path>
          </g>
        </svg>
      }
    </div>
  );
};
