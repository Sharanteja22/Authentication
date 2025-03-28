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
  },
});

export const { signInStart, signInSuccess, signInFailure } = userSlice.actions;
export default userSlice.reducer;
