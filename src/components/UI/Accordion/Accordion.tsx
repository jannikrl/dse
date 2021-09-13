import { FunctionComponent } from "react";
import styles from "./Accordion.module.css";
import { Heading } from "../../typography/Heading/Heading";
import icon from "./arrow-right.svg";

interface AccordionProps {
  title: string;
}

export const Accordion: FunctionComponent<AccordionProps> = ({ title }) => (
  <div className={styles.root}>
    <img src={icon} alt="" />
    <Heading>
      {title}
    </Heading>
  </div>
);
