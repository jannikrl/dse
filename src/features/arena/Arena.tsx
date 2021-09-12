import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectIsInAddingMode,
  selectSelectedType,
  unselect as topbarUnselect,
} from "../topbar/topbarSlice";
import styles from "./Arena.module.css";
import {
  add as arenaAdd,
  mouseOver,
  remove,
  unselect as arenaUnselect,
  selectDefinition,
  selectMouseOverId,
} from "./arenaSlice";
import { Tree } from "./components/Tree";
import { useBackspace } from "./hooks/useBackspace";

export const Arena = () => {
  const definition = useAppSelector(selectDefinition);
  const mouseOverId = useAppSelector(selectMouseOverId);
  const isInAddingMode = useAppSelector(selectIsInAddingMode);
  const selectedType = useAppSelector(selectSelectedType);
  const isMouseOver = mouseOverId === null;
  const isAvailableForDrop = definition === null;
  const showDropIndicator = isInAddingMode && isMouseOver && isAvailableForDrop;
  const canAdd = isInAddingMode && isAvailableForDrop;

  const onBackspace = useBackspace();

  const dispatch = useAppDispatch();

  const clickHandler = () => {
    if (canAdd && selectedType) {
      dispatch(arenaAdd({ id: null, type: selectedType }));
      dispatch(topbarUnselect());
      return;
    }
    dispatch(arenaUnselect());
  };

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
      {!definition && !showDropIndicator && "Add something here"}
      {!definition && showDropIndicator && <div>|</div>}
      {definition && <Tree definition={definition} />}
    </div>
  );
};
