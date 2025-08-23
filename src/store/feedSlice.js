import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: {
    feed: null 
  },
  reducers: {
    addfeed: (state, action) => {
   
      state.feed = action.payload;
     
    },
    removefeed: (state, action) => {
    

    
      if (Array.isArray(state.feed)) {
        state.feed = state.feed.filter((feed) => feed._id !== action.payload);
      } else {
        state.feed = null;
      }

     
    }
  }
});

export const { addfeed, removefeed } = feedSlice.actions;
export default feedSlice.reducer;
