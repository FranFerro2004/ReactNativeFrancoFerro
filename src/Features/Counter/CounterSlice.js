import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
    name : "counter" ,
    
    initialState : {
        value : 0
    },

    reducers: {
        increment: (state) => {
            state.value += 1
        },

        decrease: (state) => {
            state.value -= 1
        },

        incrementByAmount: (state, action) => {
            state.value += action.payload
        }, 

        resetAmount: (state) => {
            state.value = 0
        },
    }

})

export const {increment, decrease, incrementByAmount, resetAmount} = counterSlice.actions
export default counterSlice.reducer