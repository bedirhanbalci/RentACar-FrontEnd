import { storeAuthState } from "./authStorage";
import { authReducer } from "./slices/authSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

export const rootReducer = combineReducers({
  auth: authReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

store.subscribe(() => {
  storeAuthState(store.getState().auth);
});
