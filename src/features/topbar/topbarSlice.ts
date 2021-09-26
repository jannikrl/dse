import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { DefinitionType } from "../../types";

interface TopbarSlice {
  selectedType: DefinitionType | null;
  isDefinitionModalOpen: boolean;
}

const initialState: TopbarSlice = {
  selectedType: null,
  isDefinitionModalOpen: false,
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
    setIsDefinitionModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isDefinitionModalOpen = action.payload;
    },
  },
});

export const selectSelectedType = (state: RootState) =>
  state.topbar.selectedType;

export const selectIsInAddingMode = (state: RootState) =>
  state.topbar.selectedType !== null;

export const selectIsDefinitionModalOpen = (state: RootState) =>
  state.topbar.isDefinitionModalOpen;

export const { select, unselect, setIsDefinitionModalOpen } = slice.actions;

export default slice.reducer;
