import { configureStore, createReducer } from "@reduxjs/toolkit";
import  counterReducer  from "../Features/Counter/CounterSlice";
import  shopReducer  from "../Features/Shop/shopSlice";
import cartReducer from "../Features/Cart/cartSlice"
import authReducer from "../Features/User/userSlice"
import { shopApi } from "../services/shopService";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "../services/authService";

const store = configureStore({
    reducer: {
        counter: counterReducer,
        shop: shopReducer,
        cart: cartReducer,
        auth: authReducer, 
        [shopApi.reducerPath] : shopApi.reducer,
        [authApi.reducerPath] : authApi.reducer
    },
    middleware: (getDefaulMiddleware) => getDefaulMiddleware().concat(shopApi.middleware).concat(authApi.middleware)
});

setupListeners(store.dispatch)

export default store