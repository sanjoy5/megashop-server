import { createSlice } from "@reduxjs/toolkit";


const deleteProductSlice = createSlice({
    name: 'deleteProduct',
    initialState: {

    },
    reducers: {
        delete_product_request: () => {
            return {
                loading: true
            }
        },
        delete_product_success: (state, action) => {
            return {
                loading: false,
                success: true,
            }
        },
        delete_product_fail: (state, action) => {
            return {
                loading: false,
                error: action.payload
            }
        },

    }
})

export const { delete_product_request, delete_product_success, delete_product_fail } = deleteProductSlice.actions
export default deleteProductSlice.reducer