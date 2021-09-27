import { useAppSelector } from "../../../app/hooks";
import { getCssVariable } from "../../../utils/getCssVariable";
import { selectIsInAddingMode } from "../../topbar/topbarSlice";

export const useStackExpand = () => {
  const isInAddingMode = useAppSelector(selectIsInAddingMode);

  const baseStyles = {
    transition: "padding 0.3s",
  };
  const addingModeStyles = isInAddingMode
    ? {
        ...baseStyles,
        padding: 8,
        borderWidth: 1,
        borderColor: getCssVariable("--primary-500"),
        borderStyle: "dashed",
        backgroundColor: getCssVariable("--primary-200"),
      }
    : baseStyles;

  return { addingModeStyles };
};
