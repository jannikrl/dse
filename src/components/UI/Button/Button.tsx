import classNames from "classnames";
import { FunctionComponent } from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  size?: "medium" | "large";
  color?: "primary" | "secondary";
  children: string;
  onClick: () => void;
}

export const Button: FunctionComponent<ButtonProps> = ({
  size = "medium",
  color = "primary",
  children,
  onClick,
}) => {
  return (
    <button
      className={classNames(styles.root, styles[size], styles[color])}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
