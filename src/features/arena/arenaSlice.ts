import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Definition, DefinitionType, Id, Properties } from "../../types";
import { newPrimitive } from "./definition-templates/newPrimitive";
import { loop } from "./utils/loop/loop";
import { deleteEmptyProperties } from "./utils/deleteEmptyProperties";

export interface ArenaState {
  definition: Definition | null;
  selectedId: Id | null;
  mouseOverId: Id | null;
  isInExpandMode: boolean;
  isIn3dMode: boolean;
}

const initialState: ArenaState = {
  definition: null,
  selectedId: null,
  mouseOverId: null,
  isInExpandMode: false,
  isIn3dMode: false,
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
    add: (
      state,
      action: PayloadAction<{
        id?: Id;
        type: DefinitionType;
        index?: number;
      }>
    ) => {
      const primitive = newPrimitive(action.payload.type);

      if (!state.definition || !action.payload.id) {
        state.definition = primitive;
        return;
      }

      const loopResult = loop(action.payload.id, state.definition);
      const target = loopResult?.target;

      if (primitive)
        target?.children.splice(action.payload.index ?? 0, 0, primitive);
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
    updateProperty: (state, action: PayloadAction<Properties>) => {
      if (!state.selectedId || !state.definition) return;
      const loopResult = loop(state.selectedId, state.definition);
      if (!loopResult?.target) return;
      let properties = loopResult.target.properties;
      Object.assign(properties, action.payload);
      loopResult.target.properties = deleteEmptyProperties(properties);
    },
    setIsInExpandMode: (state, action: PayloadAction<boolean>) => {
      state.isInExpandMode = action.payload;
    },
    setIsIn3dMode: (state, action: PayloadAction<boolean>) => {
      state.isIn3dMode = action.payload;
    },
  },
});

export const selectDefinition = (state: RootState) => state.arena.definition;
export const selectSelectedId = (state: RootState) => state.arena.selectedId;
export const selectMouseOverId = (state: RootState) => state.arena.mouseOverId;
export const selectSelectedDefinition = (state: RootState) => {
  if (!state.arena.selectedId || !state.arena.definition) return null;
  const loopResult = loop(state.arena.selectedId, state.arena.definition);
  if (!loopResult?.target) return null;
  return loopResult.target;
};
export const selectIsInExpandMode = (state: RootState) =>
  state.arena.isInExpandMode;
export const selectIsIn3dMode = (state: RootState) => state.arena.isIn3dMode;

export const {
  select,
  unselect,
  add,
  remove,
  mouseOver,
  updateProperty,
  setIsInExpandMode,
  setIsIn3dMode,
} = slice.actions;

export default slice.reducer;
