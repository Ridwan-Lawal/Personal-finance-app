import budgetSliceReducer from "@/app/_lib/redux/budgetSlice";
import potsSliceReducer from "@/app/_lib/redux/potsSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    budgetSliceStore: budgetSliceReducer,
    potSliceStore: potsSliceReducer,
  },
});

export default store;
