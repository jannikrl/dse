import { FunctionComponent } from "react";
import { Definition } from "../../arena/arenaSlice";
import { Node } from "./Node";

interface TreeProps {
  definition: Definition;
}

export const Tree: FunctionComponent<TreeProps> = ({ definition }) => {
  return <Node definition={definition} />;
};
