import { createSlice } from "@reduxjs/toolkit";

const intialState = {
  currentUser: null,
  loading: false,
  error: null, // ✅ Change from `false` to `null` so it can store error messages
};

const userSlice = createSlice({
  name: "user",
  initialState: intialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null; // ✅ Reset error when request starts
    },
    signInSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.currentUser = null;
      state.error = action.payload; // ✅ Store error message
    },

    updateUserStart:(state,action)=>{
      state.loading=true;

    },
    updateUserSuccess:(state,action)=>{
      state.loading=false;
      state.currentUser=action.payload;
      state.error=false;
    },
    updateUserFailure:(state,action)=>{
      state.error=action.payload;
      state.loading=false;
    },
    deleteUserStart:(state,action)=>{
      state.loading=true;

    },
    deleteUserSuccess:(state)=>{
      state.loading=false;
      state.currentUser=null;
      state.error=false;
    },
    deleteUserFailure:(state,action)=>{
      state.error=action.payload;
      state.loading=false;
    },
    signOut:(state)=>{
      state.loading=false;
      state.currentUser=null;
      state.error=false;
    }
  },
});

export const { signInStart, signInSuccess, signOut,signInFailure,updateUserFailure,updateUserStart,updateUserSuccess, deleteUserFailure,deleteUserSuccess,deleteUserStart } = userSlice.actions;
export default userSlice.reducer;
