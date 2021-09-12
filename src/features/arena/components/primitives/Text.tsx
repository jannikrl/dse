import { FunctionComponent } from "react";
import { Definition } from "../../arenaSlice";
import { usePrimitiveDynamicStyles } from "../../hooks/usePrimitiveDynamicStyles";
import { usePrimitiveSelect } from "../../hooks/usePrimitiveSelect";

interface RectangleProps {
  definition: Definition;
}

export const Text: FunctionComponent<RectangleProps> = ({ definition }) => {
  const { selectSelf } = usePrimitiveSelect(definition);
  const { dynamicStyles } = usePrimitiveDynamicStyles(definition);

  return (
    <p
      style={{ ...definition.properties, ...dynamicStyles }}
      onClick={selectSelf}
    >
      {definition.properties.value}
    </p>
  );
};
