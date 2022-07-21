import { configureStore, createSlice } from "@reduxjs/toolkit";
import user from "./store/userSlice";
import cart1 from "./store/cartSlice";

//

let stock = createSlice({
  name: "stock",
  initialState: [10, 11, 12],
});
//

export default configureStore({
  reducer: {
    user: user.reducer,
    stock: stock.reducer,
    cart1: cart1.reducer,
  },
});
