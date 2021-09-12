import { FunctionComponent } from "react";
import { Definition } from "../../../arenaSlice";
import { usePrimitiveSelect } from "../../../hooks/usePrimitiveSelect";
import styles from "./Text.module.css";

interface RectangleProps {
  definition: Definition;
}

export const Text: FunctionComponent<RectangleProps> = ({ definition }) => {
  const { selectSelf, selectStyles } = usePrimitiveSelect(definition);

  return (
    <p
      className={styles.root}
      style={{ ...definition.properties, ...selectStyles }}
      onClick={selectSelf}
    >
      {definition.properties.value}
    </p>
  );
};
