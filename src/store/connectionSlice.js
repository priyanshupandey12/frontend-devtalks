import { createSlice } from "@reduxjs/toolkit";

const connectionslice=createSlice({
  name:"connection",
  initialState:{
    connections:null,

  },
  reducers:{
    addconnections:(state,action)=>{
      state.connections=action.payload
    },
     removeconnections:(state)=>{
      state.connections=null
    } 
 

    }
});

export const {addconnections,removeconnections}=connectionslice.actions
export default connectionslice.reducer