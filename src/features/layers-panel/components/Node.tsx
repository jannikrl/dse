import { FunctionComponent } from "react";
import { Rectangle } from "./primitives/Reactangle/Rectangle";
import { Definition } from "../../arena/arenaSlice";
import { Text } from "../components/primitives/Text/Text";
import { Icon } from "../components/primitives/Icon/Icon";
import { HStack } from "../components/primitives/HStack/HStack";
import { VStack } from "../components/primitives/VStack/VStack";

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
