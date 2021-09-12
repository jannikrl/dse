import { CSSProperties } from "react";
import { useAppSelector } from "../../../app/hooks";
import { getCssVariable } from "../../../utils/getCssVariable";
import { Definition, selectSelectedId } from "../arenaSlice";

export const usePrimitiveDynamicStyles = (definition: Definition) => {
  const selectedId = useAppSelector(selectSelectedId);

  const dynamicStyles: CSSProperties =
    selectedId === definition.id
      ? { outline: `1px solid ${getCssVariable("--primary-500")}` }
      : {};

  return { dynamicStyles };
};
