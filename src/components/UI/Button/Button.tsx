import { ReactNode, FunctionComponent } from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
}

export const Button: FunctionComponent<ButtonProps> = ({
  children,
  onClick,
}) => {
  return (
    <button className={styles.root} onClick={onClick}>
      {children}
    </button>
  );
};
