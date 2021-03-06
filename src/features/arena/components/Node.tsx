import { FunctionComponent } from "react";
import { HStack } from "./primitives/HStack/HStack";
import { Rectangle } from "./primitives/Reactangle/Rectangle";
import { Text } from "./primitives/Text/Text";
import { VStack } from "./primitives/VStack/VStack";
import { Icon } from "./primitives/Icon/Icon";
import { Definition } from "../../../types";

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
      case "icon":
        return <Icon definition={definition} />;
      case "text":
        return <Text definition={definition} />;
      case "hStack":
        return <HStack definition={definition}>{renderChildren()}</HStack>;
      case "vStack":
        return <VStack definition={definition}>{renderChildren()}</VStack>;
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
