import { ReactNode, FunctionComponent } from "react";
import { Body } from "../../../../components/UI/typography/Body/Body";
import styles from "./TopbarButton.module.css";

interface TopbarButtonProps {
  children: ReactNode;
  icon: ReactNode;
}

export const TopbarButton: FunctionComponent<TopbarButtonProps> = ({
  children,
  icon,
}) => (
  <div className={styles.root}>
    {icon}
    <Body className={styles.title}>{children}</Body>
  </div>
);
