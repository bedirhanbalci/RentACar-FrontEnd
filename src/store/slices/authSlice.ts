import { createSlice } from "@reduxjs/toolkit";
import { loadAuthState } from "../authStorage";
import { setToken } from "../../utils/interceptors/axiosInterceptors";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    id: 0,
    role: "",
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.id = action.payload.id;
      state.role = action.payload.role;
      // setToken(action.payload.accessToken);
    },

    logoutSuccess: state => {
      state.id = 0;
      state.role = "";
    },
  },
});

export const authReducer = authSlice.reducer;
export const { loginSuccess, logoutSuccess } = authSlice.actions;
