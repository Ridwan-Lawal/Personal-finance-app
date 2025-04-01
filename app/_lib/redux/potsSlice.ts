import { StoreType } from "@/app/_lib/redux/reduxTypes";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAddNewPotModalOpen: false,
  isEditPotModalOpen: false,
  isDeletePotModalOpen: false,
  potToEditId: "",
  potToDelete: {
    potId: "",
    potName: "",
  },
};

const potsSlice = createSlice({
  name: "pots",
  initialState,
  reducers: {
    onUpdateAddPotModalOpening(state, action) {
      state.isAddNewPotModalOpen = action.payload;
    },
    onUpdateEditPotModalOpening(state, action) {
      state.isEditPotModalOpen = action.payload.modalOpen;
      state.potToEditId = action.payload?.potId;
    },

    onUpdateDeletePotModalOpening(state, action) {
      state.isDeletePotModalOpen = action.payload?.modalOpen;
      state.potToDelete.potId = action.payload?.potId;
      state.potToDelete.potName = action.payload?.potName;
    },
  },
});

export const {
  onUpdateAddPotModalOpening,
  onUpdateEditPotModalOpening,
  onUpdateDeletePotModalOpening,
} = potsSlice.actions;

export default potsSlice.reducer;
export const getPotsSliceReducer = (store: StoreType) => store.potSliceStore;
