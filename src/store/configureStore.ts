import { storeAuthState } from "./authStorage";
import { authReducer } from "./slices/authSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { loadingReducer } from "./slices/loadingSlice";
import { rentalReducer } from "./slices/rentalSlice";
import { storeRentalState } from "./rentalStorage";

export const rootReducer = combineReducers({
  auth: authReducer,
  loading: loadingReducer,
  rental: rentalReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

store.subscribe(() => {
  storeAuthState(store.getState().auth);
  storeRentalState(store.getState().rental);
});
