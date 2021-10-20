import { TopbarButton } from "./components/TopbarButton/TopbarButton";
import { TextIcon } from "../../assets/icons/TextIcon";
import { RectangleIcon } from "../../assets/icons/RectangleIcon";
import { HStackIcon } from "../../assets/icons/HStackIcon";
import { VStackIcon } from "../../assets/icons/VStackIcon";
import { IconsIcon } from "../../assets/icons/IconsIcon";
import styles from "./Topbar.module.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  select,
  selectSelectedType,
  selectIsDefinitionModalOpen,
  setIsDefinitionModalOpen,
} from "./topbarSlice";
import { selectDefinition, unselect } from "../arena/arenaSlice";
import { DefinitionType } from "../../types";
import { Modal } from "../../components/UI/Modal/Modal";
import { Button } from "../../components/UI/Button/Button";
import { BodySmall } from "../../components/typography/BodySmall/BodySmall";
import { generate } from "../../services/code-generator/generate";
import { ModalPortal } from "../../components/UI/ModalPortal/ModalPortal";

export const Topbar = () => {
  const selectedType = useAppSelector(selectSelectedType);
  const definition = useAppSelector(selectDefinition);
  const isDefinitionModalOpen = useAppSelector(selectIsDefinitionModalOpen);

  const dispatch = useAppDispatch();

  const closeHandler = () => {
    dispatch(setIsDefinitionModalOpen(false));
  };

  const selectTypeHandler = (type: DefinitionType) => {
    dispatch(select(type));
    dispatch(unselect());
  };

  const openModalHandler = () => {
    dispatch(setIsDefinitionModalOpen(true));
  };

  const download = (filename: string, text: string) => {
    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    );
    element.setAttribute("download", filename);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  };

  const generatedCode = generate("NoName", definition);

  const downloadReactComponentButton = (
    <Button
      variant="text"
      onClick={() => download("NoName.tsx", generatedCode)}
      className={styles.downloadButton}
    >
      Download as .tsx
    </Button>
  );

  return (
    <>
      <header className={styles.root}>
        <TopbarButton
          icon={<RectangleIcon />}
          onClick={() => selectTypeHandler("rectangle")}
          isSelected={selectedType === "rectangle"}
        >
          Rectangle
        </TopbarButton>
        <TopbarButton
          icon={<TextIcon />}
          onClick={() => selectTypeHandler("text")}
          isSelected={selectedType === "text"}
        >
          Text
        </TopbarButton>
        <TopbarButton
          icon={<IconsIcon />}
          onClick={() => selectTypeHandler("icon")}
          isSelected={selectedType === "icon"}
        >
          Icon
        </TopbarButton>

        <div className={styles.divider}></div>

        <TopbarButton
          icon={<HStackIcon />}
          onClick={() => selectTypeHandler("hStack")}
          isSelected={selectedType === "hStack"}
        >
          HStack
        </TopbarButton>
        <TopbarButton
          icon={<VStackIcon />}
          onClick={() => selectTypeHandler("vStack")}
          isSelected={selectedType === "vStack"}
        >
          VStack
        </TopbarButton>

        <div className={styles.rightAlignedContainer}>
          <Button onClick={openModalHandler}>Export</Button>
        </div>
      </header>
      <ModalPortal>
        <Modal
          isOpen={isDefinitionModalOpen}
          title="Definition"
          renderHeaderSlot={() => downloadReactComponentButton}
          onClose={closeHandler}
        >
          {definition && <pre>{JSON.stringify(definition, null, 2)}</pre>}

          {!definition && (
            <BodySmall className={styles.noMargin}>Nothing to export</BodySmall>
          )}
        </Modal>
      </ModalPortal>
    </>
  );
};
