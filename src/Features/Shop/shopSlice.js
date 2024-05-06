import { createSlice } from "@reduxjs/toolkit";

export const shopSlice = createSlice({
    name: "shop" ,

    initialState: {
        value: {
            categorySelected: "",
            itemIdSelected: "",
        }
    },

    reducers: {
        setCatergorySelected: (state, action ) => {
            state.value.categorySelected = action.payload;
        },

        itemIdSelected: (state, action) => {
            state.value.itemIdSelected = action.payload;
        }
    }
});

export const { setCatergorySelected, itemIdSelected } = shopSlice.actions;

export default shopSlice.reducer;
