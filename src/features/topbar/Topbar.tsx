import { TopbarButton } from "./components/TopbarButton/TopbarButton";
import { TextIcon } from "./assets/icons/TextIcon";
import { RectangleIcon } from "./assets/icons/RectangleIcon";
import styles from "./Topbar.module.css";

export const Topbar = () => (
  <div className={styles.root}>
    <TopbarButton icon={<RectangleIcon />}>Rectangle</TopbarButton>
    <TopbarButton icon={<TextIcon />}>Text</TopbarButton>
  </div>
);