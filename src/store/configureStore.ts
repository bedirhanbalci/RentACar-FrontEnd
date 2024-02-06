import { storeAuthState } from "./authStorage";
import { authReducer } from "./slices/authSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { loadingReducer } from "./slices/loadingSlice";

export const rootReducer = combineReducers({
  auth: authReducer,
  loading: loadingReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

store.subscribe(() => {
  storeAuthState(store.getState().auth);
});
