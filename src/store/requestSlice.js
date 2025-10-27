import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: 'request',
  initialState: {
    request: null, 
  },
  reducers: {
    addrequest: (state, action) => {
      state.request = action.payload;
    },
    removerequest: (state, action) => {
 
      if (Array.isArray(state.request)) {
        state.request = state.request.filter((req) => req._id !== action.payload);
      }
      else {
        state.request = null; 
      }
    },
  },
});

export const { addrequest, removerequest } = requestSlice.actions;
export default requestSlice.reducer;
