import { createSlice } from "@reduxjs/toolkit";


const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        orders: []
    },
    reducers: {
        orders_request: () => {
            return {
                loading: true
            }
        },
        orders_success: (state, action) => {
            return {
                loading: false,
                orders: action.payload
            }

        },
        orders_fail: (state, action) => {
            return {
                loading: false,
                error: action.payload
            }
        },


    }
})

export const { orders_request, orders_success, orders_fail } = ordersSlice.actions
export default ordersSlice.reducer