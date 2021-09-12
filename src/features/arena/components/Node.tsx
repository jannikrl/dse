import { FunctionComponent } from "react";
import { Definition } from "../arenaSlice";
import { Rectangle } from "./primitives/Reactangle/Rectangle";
import { Text } from "./primitives/Text/Text";

interface NodeProps {
  definition: Definition;
}

export const Node: FunctionComponent<NodeProps> = ({ definition }) => {
  const renderItem = () => {
    switch (definition.type) {
      case "rectangle":
        return (
          <Rectangle definition={definition}>{renderChildren()}</Rectangle>
        );
      case "text":
        return <Text definition={definition} />;
    }
  };

  const renderChildren = () => {
    if (!definition.children) {
      return null;
    }

    return definition.children.map((definition) => (
      <Node definition={definition} key={definition.id} />
    ));
  };

  return renderItem();
};
