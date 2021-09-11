import { useAppDispatch, useAppSelector } from "../../app/hooks";
import styles from "./Arena.module.css";
import { remove, select, selectDefinition } from "./arenaSlice";
import { Tree } from "./components/Tree";
import { useBackspace } from "./hooks/useBackspace";

export const Arena = () => {
  const definition = useAppSelector(selectDefinition);
  const dispatch = useAppDispatch();
  const onBackspace = useBackspace();
  
  const clickHandler = () => dispatch(select(null))
  
  onBackspace(() => dispatch(remove()));

  return (
    <div className={styles.root} onClick={clickHandler}>
      {!definition && "Drag something here"}
      {definition && <Tree definition={definition} />}
    </div>
  );
};
