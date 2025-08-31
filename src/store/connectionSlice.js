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

    updateConnectionStatus: (state, action) => {
      const { userId, isOnline } = action.payload;
   
      if (state.connections && state.connections.data) {
     
        const userIndex = state.connections.data.findIndex(c => c._id === userId);

       
        if (userIndex !== -1) {
          state.connections.data[userIndex].isOnline = isOnline;
        }
      }
    },

     removeconnections:(state)=>{
      state.connections=null
    } 
 

    }
});

export const {addconnections,removeconnections,updateConnectionStatus}=connectionslice.actions
export default connectionslice.reducer