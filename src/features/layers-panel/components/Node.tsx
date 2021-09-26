import { FunctionComponent } from "react";
import { ListItem } from "./ListItem/ListItem";
import { Definition } from "../../arena/arenaSlice";

interface NodeProps {
  definition: Definition;
}

export const Node: FunctionComponent<NodeProps> = ({ definition }) => {
  const renderItem = () => (
    <ListItem definition={definition}>{renderChildren()}</ListItem>
  );

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
