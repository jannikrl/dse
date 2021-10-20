import { useAppSelector } from "../../app/hooks";
import { selectDefinition } from "../arena/arenaSlice";
import { Heading } from "../../components/typography/Heading/Heading";
import { Tree } from "./components/Tree";
import styles from "./LayersPanel.module.css";
import classNames from "classnames";

export const LayersPanel = () => {
  const definition = useAppSelector(selectDefinition);

  return (
    <aside className={classNames(styles.root, {[styles.empty]: !definition})}>
      <Heading>Layers</Heading>
      <div className={styles.treeContainer}>{definition && <Tree definition={definition} />}</div>
    </aside>
  );
};
