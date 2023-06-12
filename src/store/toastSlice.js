import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toasts: []
}


const toastSlice = createSlice({
  name: 'toast',
  initialState: initialState,
  reducers: { //toasts의 state를 변경 가능하게 해주는 함수
    addToast: (state, action) => { //toast를 추가 해주는 함수, 인자로 받는 state는 initialState를 뜻 함
      state.toasts.push(action.payload);
    },
    removeToast: (state, action) => {
      state.toasts = state.toasts.filter(toast => {
        return toast.id !== action.payload;
      })
    }
  }
})

export const { addToast, removeToast } = toastSlice.actions;

export default toastSlice.reducer;