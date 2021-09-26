import { useAppSelector } from "../../app/hooks";
import { selectDefinition } from "../arena/arenaSlice";
import { Heading } from "../../components/typography/Heading/Heading";
import { Tree } from "./components/Tree";
import styles from "./LayersPanel.module.css";

export const LayersPanel = () => {
  const definition = useAppSelector(selectDefinition);

  return (
    <div className={styles.root}>
      <Heading>Layers</Heading>
      {definition && <Tree definition={definition} />}
    </div>
  );
};
