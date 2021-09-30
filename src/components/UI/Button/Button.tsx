import classNames from "classnames";
import { FunctionComponent } from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  size?: "medium" | "large";
  variant?: "primary" | "secondary" | "text";
  children: string;
  className?: string;
  onClick: () => void;
}

export const Button: FunctionComponent<ButtonProps> = ({
  size = "medium",
  variant = "primary",
  children,
  className,
  onClick,
}) => {
  return (
    <button
      className={classNames(
        styles.root,
        styles[size],
        styles[variant],
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
