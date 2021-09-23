import { FunctionComponent, ChangeEvent } from "react";
import classNames from "classnames";
import styles from "./Margin.module.css";

interface MarginProps {
  marginTopValue: number | null;
  marginRightValue: number | null;
  marginBottomValue: number | null;
  marginLeftValue: number | null;
  onMarginTopChange: (value: number | null) => void;
  onMarginRightChange: (value: number | null) => void;
  onMarginBottomChange: (value: number | null) => void;
  onMarginLeftChange: (value: number | null) => void;
}

export const Margin: FunctionComponent<MarginProps> = ({
  marginTopValue,
  marginRightValue,
  marginBottomValue,
  marginLeftValue,
  onMarginTopChange,
  onMarginRightChange,
  onMarginBottomChange,
  onMarginLeftChange,
}) => {
  const convertValue = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "") return null;
    if (isNaN(parseInt(event.target.value))) return null;
    return parseInt(event.target.value);
  };

  return (
    <div className={styles.root}>
      <p className={styles.label}>Margin</p>
      <div className={styles.container}>
        <div className={styles.square}></div>
        <input
          value={marginTopValue ?? ""}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            onMarginTopChange(convertValue(event))
          }
          className={classNames(styles.input, styles.input1)}
          placeholder="0"
        />
        <input
          value={marginRightValue ?? ""}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            onMarginRightChange(convertValue(event))
          }
          className={classNames(styles.input, styles.input2)}
          placeholder="0"
        />
        <input
          value={marginBottomValue ?? ""}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            onMarginBottomChange(convertValue(event))
          }
          className={classNames(styles.input, styles.input3)}
          placeholder="0"
        />
        <input
          value={marginLeftValue ?? ""}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            onMarginLeftChange(convertValue(event))
          }
          className={classNames(styles.input, styles.input4)}
          placeholder="0"
        />{" "}
      </div>
    </div>
  );
};
