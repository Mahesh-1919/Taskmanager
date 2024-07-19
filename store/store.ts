import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import ProjectReducer from "./projectSlice";
const store = configureStore({
  reducer: {
    Projects: ProjectReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
