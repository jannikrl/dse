import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { combined } from "./definition-examples/combined";
import { loop } from "./utils/loop/loop";

export type Id = number;
type DefinitionType = "rectangle" | "text";

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
}

const initialState: ArenaState = {
  definition: combined,
  selectedId: null,
};

const slice = createSlice({
  name: "arena",
  initialState,
  reducers: {
    select: (state, action: PayloadAction<Id | null>) => {
      state.selectedId = action.payload;
    },
    remove: (state) => {
      if (!state.selectedId) return;
      if (!state.definition) return;

      const loopResult = loop(state.selectedId, state.definition);
      const parent = loopResult?.parent;
      const childIndex = loopResult?.childIndex;

      if (!parent || typeof childIndex !== 'number') return;

      parent.children.splice(childIndex, 1);
    },
  },
});

export const selectDefinition = (state: RootState) => state.arena.definition;
export const selectSelectedId = (state: RootState) => state.arena.selectedId;

export const { select, remove } = slice.actions;

export default slice.reducer;
