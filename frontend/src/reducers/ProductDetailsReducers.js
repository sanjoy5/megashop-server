import { createSlice } from "@reduxjs/toolkit";


const productDetailsSlice = createSlice({
    name: 'allProducts',
    initialState: {
        product: { reviews: [] },
    },
    reducers: {
        product_details_request: (state) => {
            return {
                loading: true,
                ...state
            }
        },
        product_details_success: (state, action) => {
            return {
                product: action.payload,
                loading: false
            }
        },
        product_details_fail: (state, action) => {
            return {
                loading: false,
                error: action.payload
            }
        },

        product_details_reset: (state, action) => {
            return {
                product: { reviews: [] }
            }
        }
    }
})

export const { product_details_request, product_details_success, product_details_fail, product_details_reset } = productDetailsSlice.actions
export default productDetailsSlice.reducer