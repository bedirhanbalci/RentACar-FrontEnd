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

    addAssurancePrice: (state, action) => {
      state.assurancePriceWithTotalPrice = action.payload;
    },

    clearRental: state => {
      state.startDate = "";
      state.endDate = "";
      state.assurance = 0;
      state.additional = 0;
      state.carId = 0;
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
  addAssurancePrice,
} = rentalSlice.actions;
