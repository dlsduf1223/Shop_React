import { configureStore, createSlice } from "@reduxjs/toolkit";

let cart1 = createSlice({
  name: "cart1",
  initialState: [
    { id: 0, name: "White and Black", count: 2 },
    { id: 2, name: "Grey Yordan", count: 1 },
  ],
  reducers: {
    addCount(state, action) {
      let 번호 = state.findIndex((a) => {
        return a.id === action.payload; //어레이 안에서 원하는 id 찾는법
      });
      state[번호].count++;
    },
    subCount(state, action) {
      let 번호 = state.findIndex((a) => {
        return a.id === action.payload; //어레이 안에서 원하는 id 찾는법
      });
      state[번호].count > 0 ? state[번호].count-- : (state[번호].count = 0);
    },
    addItem(state, action) {
      state.push(action.payload);
    },
  },
});
export let { addCount, subCount, addItem } = cart1.actions;

export default cart1;
