import { FunctionComponent, ReactNode } from "react";

import styles from "./Section.module.css";
import { Heading } from "../../../components/typography/Heading/Heading";

interface SectionProps {
  title: string;
  children?: ReactNode;
}

export const Section: FunctionComponent<SectionProps> = ({
  title,
  children,
}) => (
  <div className={styles.root}>
    <Heading>{title}</Heading>
    <div className={styles.content}>{children}</div>
  </div>
);
