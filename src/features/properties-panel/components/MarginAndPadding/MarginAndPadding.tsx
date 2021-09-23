import { FunctionComponent, ChangeEvent } from "react";
import classNames from "classnames";
import styles from "./MarginAndPadding.module.css";

interface MarginAndPaddingProps {
  marginTopValue: number | null;
  marginRightValue: number | null;
  marginBottomValue: number | null;
  marginLeftValue: number | null;
  paddingTopValue: number | null;
  paddingRightValue: number | null;
  paddingBottomValue: number | null;
  paddingLeftValue: number | null;
  onMarginTopChange: (value: number | null) => void;
  onMarginRightChange: (value: number | null) => void;
  onMarginBottomChange: (value: number | null) => void;
  onMarginLeftChange: (value: number | null) => void;
  onPaddingTopChange: (value: number | null) => void;
  onPaddingRightChange: (value: number | null) => void;
  onPaddingBottomChange: (value: number | null) => void;
  onPaddingLeftChange: (value: number | null) => void;
  disablePadding: boolean;
}

export const MarginAndPadding: FunctionComponent<MarginAndPaddingProps> = ({
  marginTopValue,
  marginRightValue,
  marginBottomValue,
  marginLeftValue,
  paddingTopValue,
  paddingRightValue,
  paddingBottomValue,
  paddingLeftValue,
  onMarginTopChange,
  onMarginRightChange,
  onMarginBottomChange,
  onMarginLeftChange,
  onPaddingTopChange,
  onPaddingRightChange,
  onPaddingBottomChange,
  onPaddingLeftChange,
  disablePadding = false,
}) => {
  const convertValue = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "") return null;
    if (isNaN(parseInt(event.target.value))) return null;
    return parseInt(event.target.value);
  };

  return (
    <div className={styles.root}>
      <p className={styles.label}>Margin {!disablePadding && "& padding"}</p>
      <div className={styles.container}>
        <div className={styles.outerSquare}>
          {!disablePadding && <div className={styles.innerSquare}></div>}
        </div>
        <input
          value={marginTopValue ?? ""}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            onMarginTopChange(convertValue(event))
          }
          className={classNames(styles.input, styles.marginTopInput)}
          placeholder="0"
        />
        <input
          value={marginRightValue ?? ""}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            onMarginRightChange(convertValue(event))
          }
          className={classNames(styles.input, styles.marginRightInput)}
          placeholder="0"
        />
        <input
          value={marginBottomValue ?? ""}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            onMarginBottomChange(convertValue(event))
          }
          className={classNames(styles.input, styles.marginBottomInput)}
          placeholder="0"
        />
        <input
          value={marginLeftValue ?? ""}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            onMarginLeftChange(convertValue(event))
          }
          className={classNames(styles.input, styles.marginLeftInput)}
          placeholder="0"
        />
        {!disablePadding && (
          <>
            <input
              value={paddingTopValue ?? ""}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                onPaddingTopChange(convertValue(event))
              }
              className={classNames(styles.input, styles.paddingTopInput)}
              placeholder="0"
            />
            <input
              value={paddingRightValue ?? ""}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                onPaddingRightChange(convertValue(event))
              }
              className={classNames(styles.input, styles.paddingRightInput)}
              placeholder="0"
            />
            <input
              value={paddingBottomValue ?? ""}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                onPaddingBottomChange(convertValue(event))
              }
              className={classNames(styles.input, styles.paddingBottomInput)}
              placeholder="0"
            />
            <input
              value={paddingLeftValue ?? ""}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                onPaddingLeftChange(convertValue(event))
              }
              className={classNames(styles.input, styles.paddingLeftInput)}
              placeholder="0"
            />
          </>
        )}
      </div>
    </div>
  );
};
