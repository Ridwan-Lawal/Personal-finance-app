import { StoreType } from "@/app/_lib/redux/reduxTypes";
import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  isModalOpen: false,
  isEditModalOpen: false,
  isDeleteModalOpen: false,
  budgetToEdit: "",
  budgetToDelete: {},
};

const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {
    onUpdateModalOpening(state, action) {
      state.isModalOpen = action.payload;
    },
    onUpdateEditModalOpening(state, action) {
      state.isEditModalOpen = action.payload;
    },
    onUpdateDeleteModalOpening(state, action) {
      state.isDeleteModalOpen = action.payload;
    },
    onUpdateBudgetToEdit(state, action) {
      state.budgetToEdit = action.payload;
    },

    onUpdateBudgetToDelete(state, action) {
      state.budgetToDelete = action.payload;
    },
  },
});

export const {
  onUpdateModalOpening,
  onUpdateDeleteModalOpening,
  onUpdateEditModalOpening,
  onUpdateBudgetToEdit,
  onUpdateBudgetToDelete,
} = budgetSlice.actions;

export default budgetSlice.reducer;
export const getBudgetSliceReducer = (store: StoreType) =>
  store.budgetSliceStore;
