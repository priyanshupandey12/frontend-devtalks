import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: 'request',
  initialState: {
    request: null, // Initialize as an empty array
  },
  reducers: {
    addrequest: (state, action) => {
      state.request = action.payload;
    },
    removerequest: (state, action) => {
      // Make sure that state.request is an array before using the filter method
      if (Array.isArray(state.request)) {
        state.request = state.request.filter((req) => req._id !== action.payload);
      }
      else {
        state.request = null; // Reset to null if feed is not an array
      }
    },
  },
});

export const { addrequest, removerequest } = requestSlice.actions;
export default requestSlice.reducer;
