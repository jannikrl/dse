import classNames from "classnames";
import { ReactNode, FunctionComponent } from "react";
import styles from "./Heading.module.css";

interface HeadingProps {
  children: ReactNode;
  className?: string;
}

export const Heading: FunctionComponent<HeadingProps> = ({
  children,
  className,
}) => <h3 className={classNames(styles.root, className)}>{children}</h3>;
