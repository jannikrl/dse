import { FunctionComponent } from "react";
import { Definition } from "../../arenaSlice";
import { usePrimitiveHelpers } from "../../hooks/usePrimitiveHelpers";

interface RectangleProps {
  definition: Definition;
}

export const Text: FunctionComponent<RectangleProps> = ({ definition }) => {
  const { clickHandler, ekstraStyles } = usePrimitiveHelpers(definition);

  return (
    <p
      style={{ ...definition.properties, ...ekstraStyles }}
      onClick={clickHandler}
    >
      {definition.properties.value}
    </p>
  );
};
