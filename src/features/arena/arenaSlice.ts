import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { DefinitionType, Id } from "../../types";
import { combined } from "./definition-templates/combined-example";
import { newPrimitive } from "./definition-templates/newPrimitive";
import { loop } from "./utils/loop/loop";

// Component Definition - We "define" our components
export interface Definition {
  type: DefinitionType;
  id: Id;
  properties: Properties;
  children: Definition[];
}

interface Properties {
  minWidth?: number;
  minHeight?: number;
  backgroundColor?: string;
  value?: string;
}

export interface ArenaState {
  definition: Definition | null;
  selectedId: Id | null;
  mouseOverId: Id | null;
}

const initialState: ArenaState = {
  definition: combined,
  selectedId: null,
  mouseOverId: null,
};

const slice = createSlice({
  name: "arena",
  initialState,
  reducers: {
    select: (state, action: PayloadAction<Id>) => {
      state.selectedId = action.payload;
    },
    unselect: (state) => {
      state.selectedId = null;
    },
    add: (state, action: PayloadAction<{ id: Id; type: DefinitionType }>) => {
      if (!state.definition) return;

      const loopResult = loop(action.payload.id, state.definition);

      const target = loopResult?.target;
      const primitive = newPrimitive(action.payload.type);

      if (primitive) target?.children.push(primitive);
    },
    remove: (state) => {
      if (!state.selectedId) return;
      if (!state.definition) return;
      if (state.selectedId === state.definition.id) {
        state.definition = null;
        return;
      }

      const loopResult = loop(state.selectedId, state.definition);
      const parent = loopResult?.parent;
      const childIndex = loopResult?.childIndex;

      if (!parent || typeof childIndex !== "number") return;

      parent.children.splice(childIndex, 1);
    },
    mouseOver: (state, action: PayloadAction<Id | null>) => {
      state.mouseOverId = action.payload;
    },
  },
});

export const selectDefinition = (state: RootState) => state.arena.definition;
export const selectSelectedId = (state: RootState) => state.arena.selectedId;
export const selectMouseOverId = (state: RootState) => state.arena.mouseOverId;

export const { select, unselect, add, remove, mouseOver } = slice.actions;

export default slice.reducer;
