import { configureStore } from "@reduxjs/toolkit";
import  counterReducer  from "../Features/Counter/CounterSlice";
import  shopReducer  from "../Features/Shop/shopSlice";
import cartReducer from "../Features/Cart/cartSlice"

export default configureStore({
    reducer: {
        counter: counterReducer,
        shop: shopReducer,
        cart: cartReducer,
    }
});
