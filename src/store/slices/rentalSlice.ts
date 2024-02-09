import { Card } from "react-bootstrap";
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
      state.additional = [...action.payload];
    },

    addRental: (state, action) => {
      state.startDate = action.payload;
      state.endDate = action.payload;
    },

    addCarId: (state, action) => {
      state.carId = action.payload;
    },

    addRentalPrice: (state, action) => {
      state.rentalPrice = action.payload;
    },

    clearRental: state => {
      delete state.startDate;
      delete state.endDate;
      delete state.assurance;
      delete state.additional;
      delete state.carId;
    },
  },
});

export const rentalReducer = rentalSlice.reducer;
export const {
  addAssurance,
  addAdditional,
  addRental,
  clearRental,
  addCarId,
  addRentalPrice,
} = rentalSlice.actions;
