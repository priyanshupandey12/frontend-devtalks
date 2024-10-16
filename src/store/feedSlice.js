import { createSlice } from "@reduxjs/toolkit";

const feedSlice=createSlice({
  name:"feed",
  initialState:{
    feed:null 
  },
  reducers:{
     addfeed:(state,action)=>{
       state.feed=action.payload
       console.log('State after addfeed:', state.feed);
     },
     removefeed:(state,action)=>{
      console.log('State before removefeed:', state.feed);
      if (state.feed) {
        state.feed = state.feed.filter((feed) => feed._id !== action.payload);
      }
      console.log('State after removefeed:', state.feed);
     }
  }
})


export const {addfeed,removefeed}=feedSlice.actions
export default feedSlice.reducer 