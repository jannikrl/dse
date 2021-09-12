import { useAppDispatch, useAppSelector } from "../../app/hooks";
import styles from "./Arena.module.css";
import { mouseOver, remove, unselect, selectDefinition } from "./arenaSlice";
import { Tree } from "./components/Tree";
import { useBackspace } from "./hooks/useBackspace";

export const Arena = () => {
  const definition = useAppSelector(selectDefinition);
  const dispatch = useAppDispatch();
  const onBackspace = useBackspace();

  const clickHandler = () => dispatch(unselect());

  const mouseOverHandler = () => {
    dispatch(mouseOver(null));
  };

  onBackspace(() => dispatch(remove()));

  return (
    <div
      className={styles.root}
      onClick={clickHandler}
      onMouseOver={mouseOverHandler}
    >
      {!definition && "Drag something here"}
      {definition && <Tree definition={definition} />}
    </div>
  );
};
