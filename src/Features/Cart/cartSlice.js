import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({

    name: "cart",

    initialState: {
        cart: []
    },

    reducers: {
        addItem: (state, action) => {
            const { id, title, price, thumbnail, quantity } = action.payload;
            const newItem = { id, title, price, thumbnail, quantity };
            state.cart.push(newItem);
        }


    }

})

export const { addItem } = cartSlice.actions;

export default cartSlice.reducer;