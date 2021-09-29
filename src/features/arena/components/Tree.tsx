import { FunctionComponent } from "react";
import { Definition } from "../../../types";
import { Node } from "./Node";

interface TreeProps {
  definition: Definition;
}

export const Tree: FunctionComponent<TreeProps> = ({ definition }) => {
  return <Node definition={definition} />;
};
