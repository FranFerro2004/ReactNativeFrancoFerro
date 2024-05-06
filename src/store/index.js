import { configureStore } from "@reduxjs/toolkit";
import  counterReducer  from "../Features/Counter/CounterSlice";
import  shopReducer  from "../Features/Shop/shopSlice";
import cartReducer from "../Features/Cart/cartSlice"
import { shopApi } from "../services/shopService";

const store = configureStore({
    reducer: {
        counter: counterReducer,
        shop: shopReducer,
        cart: cartReducer,
        [shopApi.reducerPath] :shopApi.Reducer
    },
    middleware: (getDefaulMiddleware) => getDefaulMiddleware().concat(shopApi.middleware)
});

serupListeners(store.dispatch)

export default store