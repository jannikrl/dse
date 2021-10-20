import { FunctionComponent } from "react";
import styles from "./Shortcuts.module.css";

export const Shortcuts: FunctionComponent = () => (
  <footer className={styles.root}>
    <div className={styles.container}>
      <div className={styles.button}>⌥</div>
      Expand stacks
    </div>
    <div className={styles.container}>
      <div className={styles.button}>⇧</div>
      View in 3D
    </div>
  </footer>
);
