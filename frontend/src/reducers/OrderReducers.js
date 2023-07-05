import { createSlice } from "@reduxjs/toolkit";


const orderSlice = createSlice({
    name: 'order',
    initialState: {},
    reducers: {
        order_create_request: () => {
            return {
                loading: true
            }
        },
        order_create_success: (state, action) => {
            return {
                loading: false,
                success: true,
                order: action.payload
            }
        },
        order_create_fail: (action) => {
            return {
                loading: false,
                error: action.payload
            }
        },
        order_create_reset: () => {
            return {}
        }

    }
})

export const { order_create_request, order_create_success, order_create_fail, order_create_reset } = orderSlice.actions
export default orderSlice.reducer