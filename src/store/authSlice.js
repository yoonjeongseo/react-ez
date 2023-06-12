import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggeIn: false
}


const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: { 
    login: (state) => {
      state.isLoggeIn = true;
    },
    logout: (state) => {
      state.isLoggeIn = false;
    }
  }
})

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;