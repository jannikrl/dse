import classNames from "classnames";
import { FunctionComponent, ChangeEvent } from "react";
import styles from "./Input.module.css";

interface InputProps {
  value?: string | number;
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
  className?: string;
}

export const Input: FunctionComponent<InputProps> = ({
  value,
  onChange,
  onBlur,
  className,
}) => {
  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value);
  };
  const blurHandler = (event: ChangeEvent<HTMLInputElement>) => {
    console.log("Input - blurHandler");
    onBlur?.(event.target.value);
  };

  return (
    <input
      className={classNames(styles.root, className)}
      value={value}
      onChange={changeHandler}
      onBlur={blurHandler}
    />
  );
};
