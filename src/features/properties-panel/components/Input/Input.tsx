import classNames from "classnames";
import { FunctionComponent, ChangeEvent } from "react";
import styles from "./Input.module.css";

interface InputProps {
  value?: string | number;
  onChange: (value: string | number) => void;
  className?: string;
  type: "text" | "number";
}

export const Input: FunctionComponent<InputProps> = ({
  value,
  onChange,
  className,
  type,
}) => {
  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const value =
      type === "number" ? Number(event.target.value) : event.target.value;
    onChange(value);
  };

  return (
    <input
      className={classNames(styles.root, className)}
      value={value}
      onChange={changeHandler}
    />
  );
};
