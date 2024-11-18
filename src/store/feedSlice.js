import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: {
    feed: null // Initialize with null
  },
  reducers: {
    addfeed: (state, action) => {
      // Set feed to the action payload (could be an array or any other structure)
      state.feed = action.payload;
      console.log("State after addfeed:", state.feed);
    },
    removefeed: (state, action) => {
      console.log("State before removefeed:", state.feed);

      // If feed is not null and is an array, apply filter
      if (Array.isArray(state.feed)) {
        state.feed = state.feed.filter((feed) => feed._id !== action.payload);
      } else {
        state.feed = null; // Reset to null if feed is not an array
      }

      console.log("State after removefeed:", state.feed);
    }
  }
});

export const { addfeed, removefeed } = feedSlice.actions;
export default feedSlice.reducer;
