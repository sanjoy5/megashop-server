import { createSlice } from "@reduxjs/toolkit";


const updateProductslice = createSlice({
    name: 'updateProduct',
    initialState: {
        product: {}
    },
    reducers: {
        update_product_request: () => {
            return {
                loading: true
            }
        },
        update_product_success: (state, action) => {
            return {
                loading: false,
                success: true,
                product: action.payload
            }
        },
        update_product_fail: (state, action) => {
            return {
                loading: false,
                error: action.payload
            }
        },
        update_product_reset: () => {
            return {
                product: {}
            }
        }

    }
})

export const { update_product_request, update_product_success, update_product_fail, update_product_reset } = updateProductslice.actions
export default updateProductslice.reducer