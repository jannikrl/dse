import { FunctionComponent, MouseEvent } from "react";
import { useAppSelector } from "../../../../../app/hooks";
import { Definition } from "../../../../../types";
import {
  selectIsIn3dMode,
  selectMouseOverId,
  selectSelectedId,
} from "../../../arenaSlice";
import { usePrimitiveHover } from "../../../hooks/usePrimitiveHover";
import { usePrimitiveSelect } from "../../../hooks/usePrimitiveSelect";
import styles from "./Icon.module.css";
import arenaStyles from "../../../Arena.module.css";
import classNames from "classnames";

interface IconProps {
  definition: Definition;
}

export const Icon: FunctionComponent<IconProps> = ({ definition }) => {
  const isIn3dMode = useAppSelector(selectIsIn3dMode);
  const selectedId = useAppSelector(selectSelectedId);
  const mouseOverId = useAppSelector(selectMouseOverId);

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
