import { TopbarButton } from "./components/TopbarButton/TopbarButton";
import { TextIcon } from "./assets/icons/TextIcon";
import { RectangleIcon } from "./assets/icons/RectangleIcon";
import styles from "./Topbar.module.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { select, selectSelectedType } from "./topbarSlice";
import { unselect } from "../arena/arenaSlice";
import { DefinitionType } from "../../types";

export const Topbar = () => {
  const selectedType = useAppSelector(selectSelectedType);
  const dispatch = useAppDispatch();

  const clickHandler = (type: DefinitionType) => {
    dispatch(select(type));
    dispatch(unselect());
  };

  return (
    <div className={styles.root}>
      <TopbarButton
        icon={<RectangleIcon />}
        type="rectangle"
        onClick={clickHandler}
        isSelected={selectedType === "rectangle"}
      >
        Rectangle
      </TopbarButton>
      <TopbarButton
        icon={<TextIcon />}
        type="text"
        onClick={clickHandler}
        isSelected={selectedType === "text"}
      >
        Text
      </TopbarButton>
    </div>
  );
};
