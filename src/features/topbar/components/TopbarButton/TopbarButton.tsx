import classNames from "classnames";
import { ReactNode, FunctionComponent } from "react";
import { Body } from "../../../../components/UI/typography/Body/Body";
import { DefinitionType } from "../../../../types";
import styles from "./TopbarButton.module.css";

interface TopbarButtonProps {
  children: ReactNode;
  icon: ReactNode;
  type: DefinitionType;
  isSelected: boolean,
  onClick: (type: DefinitionType) => void;
}

export const TopbarButton: FunctionComponent<TopbarButtonProps> = ({
  children,
  icon,
  type,
  isSelected,
  onClick,
}) => {
  return (
    <button
      className={classNames(styles.root, { [styles.selected]: isSelected })}
      onClick={() => onClick(type)}
    >
      {icon}
      <Body
        className={classNames(styles.title, { [styles.selected]: isSelected })}
      >
        {children}
      </Body>
    </button>
  );
};
