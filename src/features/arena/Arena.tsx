import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Body } from "../../components/typography/Body/Body";
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
  setIsInExpandMode,
  setIsIn3dMode,
  selectIsIn3dMode,
} from "./arenaSlice";
import { Tree } from "./components/Tree";
import { useAlt } from "./hooks/keyPress/useAlt";
import { useBackspace } from "./hooks/keyPress/useBackspace";
import { useEscape } from "./hooks/keyPress/useEscape";
import { useShift } from "./hooks/keyPress/useShift";

export const Arena = () => {
  const definition = useAppSelector(selectDefinition);
  const mouseOverId = useAppSelector(selectMouseOverId);
  const isInAddingMode = useAppSelector(selectIsInAddingMode);
  const isIn3dMode = useAppSelector(selectIsIn3dMode);
  const selectedType = useAppSelector(selectSelectedType);
  const isMouseOver = mouseOverId === null;
  const isAvailableForDrop = definition === null;
  const showDropIndicator = isInAddingMode && isMouseOver && isAvailableForDrop;
  const canAdd = isInAddingMode && isAvailableForDrop;

  const onBackspace = useBackspace();
  const onEscape = useEscape();
  const onAlt = useAlt();
  const onShift = useShift();

  const dispatch = useAppDispatch();

  onBackspace(() => dispatch(remove()));
  onEscape(() => {
    dispatch(arenaUnselect());
    dispatch(topbarUnselect());
  });
  onAlt(
    () => dispatch(setIsInExpandMode(true)),
    () => dispatch(setIsInExpandMode(false))
  );
  onShift(
    () => dispatch(setIsIn3dMode(true)),
    () => dispatch(setIsIn3dMode(false))
  );

  const clickHandler = () => {
    if (canAdd && selectedType) {
      dispatch(arenaAdd({ type: selectedType }));
      dispatch(topbarUnselect());
      return;
    }
    dispatch(arenaUnselect());
  };

  const mouseOverHandler = () => {
    dispatch(mouseOver(null));
  };

  return (
    <div
      className={styles.root}
      onClick={clickHandler}
      onMouseOver={mouseOverHandler}
    >
      <div className={classNames(styles.scene3d, { [styles.active]: isIn3dMode })}>
        {!definition && !showDropIndicator && <Body>Add something here</Body>}
        {!definition && showDropIndicator && <div>|</div>}
        {definition && <Tree definition={definition} />}
      </div>
    </div>
  );
};
