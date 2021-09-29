import { CSSProperties } from "react";
import { useAppSelector } from "../../../app/hooks";
import { Definition } from "../../../types";
import {
  selectIsIn3dMode,
  selectIsInExpandMode,
} from "../arenaSlice";

export const usePrimitive3d = (definition: Definition) => {
  const isIn3dMode = useAppSelector(selectIsIn3dMode);
  const isInExpandMode = useAppSelector(selectIsInExpandMode);

  const isStack = definition.type === "vStack" || definition.type === "hStack";

  const styles3d = {
    transform: "translateZ(0px)",
    transformStyle: "preserve-3d",
  } as CSSProperties;

  if (isStack && !isInExpandMode) return { styles3d };

  if (isIn3dMode) {
    Object.assign(styles3d, {
      transform: "translateZ(30px)",
      boxShadow: "-10px 30px 10px rgba(0,0,0,0.1)",
    });
  }

  return { styles3d };
};
