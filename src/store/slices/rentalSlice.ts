import { createSlice } from "@reduxjs/toolkit";
import { loadRentalState } from "../rentalStorage";

const rentalSlice = createSlice({
  name: "rental",
  initialState: loadRentalState(),
  reducers: {
    addAssurance: (state, action) => {
      state.assurance = action.payload;
    },
    addAdditional: (state, action) => {
      state.additional = [...state.additional, action.payload.additional];
    },

    addRental: (state, action) => {
      state.startDate = action.payload;
      state.endDate = action.payload;
    },
  },
});

export const rentalReducer = rentalSlice.reducer;
export const { addAssurance, addAdditional, addRental } = rentalSlice.actions;
