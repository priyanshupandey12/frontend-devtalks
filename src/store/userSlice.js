import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null    
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;           
    },
    logout: (state) => {
      state.user = null;
    }
  }
});

export const { login, logout, refreshAccessToken } = userSlice.actions;
export default userSlice.reducer;
