import { createSlice } from "@reduxjs/toolkit";


const orderPaySlice = createSlice({
    name: 'orderPay',
    initialState: {},
    reducers: {
        order_pay_request: () => {
            return {
                loading: true
            }
        },
        order_pay_success: () => {
            return {
                loading: false,
                success: true
            }
        },
        order_pay_fail: (action) => {
            return {
                loading: false,
                error: action.payload
            }
        },
        order_pay_reset: () => {
            return {}
        }

    }
})

export const { order_pay_request, order_pay_success, order_pay_fail, order_pay_reset } = orderPaySlice.actions
export default orderPaySlice.reducer