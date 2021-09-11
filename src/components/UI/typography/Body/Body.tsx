import { FunctionComponent } from "react";
import styles from "./Body.module.css";

export const Body: FunctionComponent<
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  >
> = ({ children, className, ...props }) => {
  const classNames = className
    ? [className, styles.root].join(" ")
    : styles.root;
  return (
    <p className={classNames} {...props}>
      {children}
    </p>
  );
};
