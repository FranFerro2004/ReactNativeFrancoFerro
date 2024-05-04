import { configureStore } from "@reduxjs/toolkit";
import  counterReducer  from "../Features/Counter/CounterSlice";

export default configureStore({
    reducer: {
        counter: counterReducer
    }
});
