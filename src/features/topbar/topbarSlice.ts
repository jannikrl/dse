import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { DefinitionType } from "../../types";

interface TopbarSlice {
  selectedType: DefinitionType | null;
}

const initialState: TopbarSlice = {
  selectedType: null,
};

const slice = createSlice({
  name: "topbar",
  initialState,
  reducers: {
    select: (state, action: PayloadAction<DefinitionType>) => {
      state.selectedType = action.payload;
    },
    unselect: (state) => {
      state.selectedType = null;
    },
  },
});

export const selectSelectedType = (state: RootState) =>
  state.topbar.selectedType;

export const selectIsInAddingMode = (state: RootState) =>
  state.topbar.selectedType !== null;

export const { select, unselect } = slice.actions;

export default slice.reducer;
