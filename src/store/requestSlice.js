import { createSlice } from "@reduxjs/toolkit";

const requestSlice=createSlice({
  name:'request',
  initialState:{
    request:null
  },
  reducers:{
    addrequest:(state,action)=>{
      state.request=action.payload
    },
    removerequest:(state,action)=>{
      const filterreq=state.request.filter((req)=>req._id!==action.payload)
      return filterreq;
    }
  }
})
 
export const {addrequest,removerequest}=requestSlice.actions
export default requestSlice.reducer