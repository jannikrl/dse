import { FunctionComponent } from "react";
import { MutableRefObject, CSSProperties } from "react";

interface DropIndicatorProps {
    ref: MutableRefObject<HTMLDivElement | null>,
    style: CSSProperties,
}

export const DropIndicator: FunctionComponent<DropIndicatorProps> = ({ref, style}) => (
  <div
    style={{
      position: "absolute",
      top: 0,
      transform: "translateX(-2px)",
      ...style
    }}
    ref={ref}
  >
    |
  </div>
);
