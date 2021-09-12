import { Id } from "../../../../types";
import { Definition } from "../../arenaSlice";

type Loop = (
  id: Id,
  definition: Definition,
  parent?: Definition | null,
  childIndex?: number | null,
) => LoopResult | null;

interface LoopResult {
  target: Definition;
  parent: Definition | null;
  childIndex: number | null;
}

export const loop: Loop = (
  id,
  definition,
  parent = null,
  childIndex = null
) => {
  const result = {
    target: definition,
    parent,
    childIndex,
  };

  if (id === definition.id) return result;

  for (let i = 0; i < definition.children.length; i++) {
    const child = definition.children[i];
    const result = loop(id, child, definition, i);
    if (result) return result;
  }

  return null;
};
