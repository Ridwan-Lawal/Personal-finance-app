import budgetSliceReducer from "@/app/_lib/redux/budgetSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    budgetSliceStore: budgetSliceReducer,
  },
});

export default store;
