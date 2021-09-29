import { FunctionComponent, ReactNode, MouseEvent } from "react";
import { useAppDispatch } from "../../../../app/hooks";
import { mouseOver } from "../../../arena/arenaSlice";
import { usePrimitiveSelect } from "../../hooks/usePrimitiveSelect";
import { BodySmall } from "../../../../components/typography/BodySmall/BodySmall";
import { TextIcon } from "../../../../assets/icons/TextIcon";
import { RectangleIcon } from "../../../../assets/icons/RectangleIcon";
import { HStackIcon } from "../../../../assets/icons/HStackIcon";
import { VStackIcon } from "../../../../assets/icons/VStackIcon";
import { IconsIcon } from "../../../../assets/icons/IconsIcon";
import styles from "./ListItem.module.css";
import { Definition } from "../../../../types";

interface ListItemProps {
  definition: Definition;
  children: ReactNode;
}

export const ListItem: FunctionComponent<ListItemProps> = ({
  definition,
  children,
}) => {
  const { selectSelf, selectStyles } = usePrimitiveSelect(definition);

  const dispatch = useAppDispatch();

  const mouseOverHandler = (event: MouseEvent) => {
    event.stopPropagation();
    dispatch(mouseOver(definition.id));
  };

  const clickHandler = (event: MouseEvent) => {
    event.stopPropagation();
    selectSelf();
  };

  const text = (() => {
    switch (definition.type) {
      case "rectangle":
        return "Rectangle";
      case "icon":
        return "Icon";
      case "text":
        return definition.properties.text;
      case "hStack":
        return "HStack";
      case "vStack":
        return "VStack";
    }
  })();

  const icon = (() => {
    switch (definition.type) {
      case "rectangle":
        return <RectangleIcon />;
      case "icon":
        return <IconsIcon />;
      case "text":
        return <TextIcon />;
      case "hStack":
        return <HStackIcon />;
      case "vStack":
        return <VStackIcon />;
    }
  })();

  return (
    <>
      <div
        style={{
          ...selectStyles,
        }}
        onClick={clickHandler}
        onMouseOver={mouseOverHandler}
        className={styles.root}
      >
        {icon}
        <BodySmall>{text}</BodySmall>
      </div>
      <div className={styles.children}>{children}</div>
    </>
  );
};
