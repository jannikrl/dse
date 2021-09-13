import { FunctionComponent } from "react";
import styles from "./BodySmall.module.css";

export const BodySmall: FunctionComponent<
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
