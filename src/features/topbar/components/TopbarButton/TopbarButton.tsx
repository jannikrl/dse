import classNames from "classnames";
import { ReactNode, FunctionComponent } from "react";
import { BodySmall } from "../../../../components/typography/BodySmall/BodySmall";
import styles from "./TopbarButton.module.css";

interface TopbarButtonProps {
  icon: ReactNode;
  children: string;
  isSelected?: boolean;
  onClick: () => void;
}

export const TopbarButton: FunctionComponent<TopbarButtonProps> = ({
  children,
  icon,
  isSelected = false,
  onClick,
}) => {
  return (
    <button
      className={classNames(styles.root, { [styles.selected]: isSelected })}
      onClick={onClick}
    >
      {icon}
      <BodySmall
        className={classNames(styles.title, { [styles.selected]: isSelected })}
      >
        {children}
      </BodySmall>
    </button>
  );
};
