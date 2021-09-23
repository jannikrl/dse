import classNames from "classnames";
import { forwardRef } from "react";
import styles from "./EmptyStackPlaceholder.module.css";

interface PlaceholderProps {
  type: "hStack" | "vStack";
}

export const EmptyStackPlaceholder = forwardRef<
  HTMLDivElement,
  PlaceholderProps
>(({ type }, ref) => {
  const isVStack = type === "vStack";
  return (
    <div ref={ref} className={classNames(styles.root, { [styles.vStack]: isVStack })}>
      <p>Drop here</p>
    </div>
  );
});
