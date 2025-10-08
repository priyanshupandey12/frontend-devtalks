import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,       // user info (id, name, email, role, etc.)
  accessToken: null // short-lived JWT
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;           // user object
      state.accessToken = action.payload.token;   // access token
    },
    refreshAccessToken: (state, action) => {
      state.accessToken = action.payload;         // just update token when refreshed
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
    }
  }
});

export const { login, logout, refreshAccessToken } = userSlice.actions;
export default userSlice.reducer;
