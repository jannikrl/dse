import { Accordion } from "../../components/UI/Accordion/Accordion";
import styles from "./LayersPanel.module.css";

export const LayersPanel = () => (
  <div className={styles.root}>
    <Accordion title="Layers" />
  </div>
);
