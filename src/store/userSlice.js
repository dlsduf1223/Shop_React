import { configureStore, createSlice } from "@reduxjs/toolkit";

let user = createSlice({
  name: "user",
  initialState: "kim",

  reducers: {
    chageName(state) {
      return "john kim";
    },
  },
});

export let { chageName } = user.actions;

export default user;
