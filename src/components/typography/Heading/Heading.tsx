import { ReactNode, FunctionComponent } from "react";
import styles from "./Heading.module.css";

interface HeadingProps {
  children: ReactNode;
}

export const Heading: FunctionComponent<HeadingProps> = ({ children }) => (
  <h3 className={styles.root}>{children}</h3>
);
