import { createSlice } from "@reduxjs/toolkit";


const productsSlice = createSlice({
    name: 'allProducts',
    initialState: {
        products: [],
        product: { reviews: [] },
    },
    reducers: {
        isLoading: (state) => {
            return {
                loading: true,
                products: []
            }
        },
        getProducts: (state, action) => {
            return {
                loading: false,
                products: action.payload.products,
                page: action.payload.page,
                pages: action.payload.pages,
            }
        },

        isError: (state, action) => {
            return {
                loading: false,
                error: action.payload
            }
        }
    }
})

export const { isLoading, getProducts, isError } = productsSlice.actions
export default productsSlice.reducer