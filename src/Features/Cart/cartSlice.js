import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        value: {
            user: 'userLogged',
            cart: [],
            total: null,
            updatedAt: new Date().toLocaleString()
        }
    },
    reducers: {
        addItem: (state, action) => {
            const productRepeated = state.value.cart.find((item) => item.id === action.payload.id);

            if (productRepeated) {
                const itemsUpdated = state.value.cart.map((item) => {
                    if (item.id === action.payload.id) {
                        return { ...item, quantity: item.quantity + action.payload.quantity };
                    }
                    return item;
                });

                const total = itemsUpdated.reduce(
                    (acc, currentItem) => acc + currentItem.price * currentItem.quantity,
                    0
                );

                state.value = {
                    ...state.value,
                    cart: itemsUpdated,
                    total,
                    updatedAt: new Date().toLocaleString(),
                };

            } else {
                state.value.cart.push(action.payload);
                const total = state.value.cart.reduce(
                    (acc, currentItem) => acc + currentItem.price * currentItem.quantity,
                    0
                );
                state.value = {
                    ...state.value,
                    total,
                    updatedAt: new Date().toLocaleString(),
                };
            }
        },
        deleteItem: (state, action) => {
            const itemsUpdated = state.value.cart.filter(item => item.id !== action.payload);

            const total = itemsUpdated.reduce(
                (acc, currentItem) => acc + currentItem.price * currentItem.quantity,
                0
            );

            state.value = {
                ...state.value,
                cart: itemsUpdated,
                total,
                updatedAt: new Date().toLocaleString(),
            };
        }
    }
});

export const { addItem, deleteItem } = cartSlice.actions;

export default cartSlice.reducer;
