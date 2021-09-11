import { FunctionComponent, ReactNode } from "react";
import { Definition } from "../../arenaSlice";
import { usePrimitiveHelpers } from "../../hooks/usePrimitiveHelpers";

interface RectangleProps {
  definition: Definition;
  children: ReactNode;
}

export const Rectangle: FunctionComponent<RectangleProps> = ({
  definition,
  children,
}) => {
  const { clickHandler, ekstraStyles } = usePrimitiveHelpers(definition);
  
  return (
    <div
      style={{ ...definition.properties, ...ekstraStyles }}
      onClick={clickHandler}
    >
      {children}
    </div>
  );
};
