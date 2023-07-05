import { createSlice } from "@reduxjs/toolkit";



const orderDetailsSlice = createSlice({
    name: 'orderDetails',
    initialState: {
        loading: true,
        orderItems: [],
        shippingAddress: {}
    },
    reducers: {
        order_details_request: (state) => {
            return {
                ...state,
                loading: true
            }
        },
        order_details_success: (state, action) => {
            return {
                loading: false,
                order: action.payload
            }
        },
        order_details_fail: (action) => {
            return {
                loading: false,
                error: action.payload
            }
        }
    }
})


export const { order_details_request, order_details_success, order_details_fail } = orderDetailsSlice.actions
export default orderDetailsSlice.reducer