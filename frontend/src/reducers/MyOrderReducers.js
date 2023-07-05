import { createSlice } from "@reduxjs/toolkit";


const myOrderSlice = createSlice({
    name: 'orderPay',
    initialState: {
        orders: []
    },
    reducers: {
        myorder_request: () => {
            return {
                loading: true
            }
        },
        myorder_success: (state, action) => {
            return {
                loading: false,
                orders: action.payload
            }

        },
        myorder_fail: (state, action) => {
            return {
                loading: false,
                error: action.payload
            }
        },
        myorder_reset: () => {
            return {
                orders: []
            }
        }

    }
})

export const { myorder_request, myorder_success, myorder_fail, myorder_reset } = myOrderSlice.actions
export default myOrderSlice.reducer