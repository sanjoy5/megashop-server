import { createSlice } from "@reduxjs/toolkit";


const createReviewSlice = createSlice({
    name: 'createReview',
    initialState: {

    },
    reducers: {
        create_review_request: () => {
            return {
                loading: true
            }
        },
        create_review_success: (state, action) => {
            return {
                loading: false,
                success: true,
            }
        },
        create_review_fail: (state, action) => {
            return {
                loading: false,
                error: action.payload
            }
        },
        create_review_reset: () => {
            return {}
        }

    }
})

export const { create_review_request, create_review_success, create_review_fail, create_review_reset } = createReviewSlice.actions
export default createReviewSlice.reducer