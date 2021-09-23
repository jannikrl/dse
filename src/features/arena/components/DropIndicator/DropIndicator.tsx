import classNames from "classnames";
import { forwardRef } from "react";
import { CSSProperties } from "react";
import styles from "./DropIndicator.module.css";

interface DropIndicatorProps {
  style: CSSProperties;
  isVertical?: boolean;
}

export const DropIndicator = forwardRef<HTMLDivElement, DropIndicatorProps>(
  ({ style, isVertical = false }, ref) => (
    <div
      style={style}
      className={classNames(styles.root, { [styles.vertical]: isVertical })}
      ref={ref}
    >
      |
    </div>
  )
);
