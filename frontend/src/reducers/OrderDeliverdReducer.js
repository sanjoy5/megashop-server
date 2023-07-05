import { createSlice } from "@reduxjs/toolkit";


const orderDeliverSlice = createSlice({
    name: 'orderDeliver',
    initialState: {},
    reducers: {
        order_deliver_request: () => {
            return {
                loading: true
            }
        },
        order_deliver_success: () => {
            return {
                loading: false,
                success: true
            }
        },
        order_deliver_fail: (action) => {
            return {
                loading: false,
                error: action.payload
            }
        },
        order_deliver_reset: () => {
            return {}
        }

    }
})

export const { order_deliver_request, order_deliver_success, order_deliver_fail, order_deliver_reset } = orderDeliverSlice.actions
export default orderDeliverSlice.reducer