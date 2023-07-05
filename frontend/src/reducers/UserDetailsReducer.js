import { createSlice } from '@reduxjs/toolkit'

const userDetailsSlice = createSlice({
    name: 'userDetail',
    initialState: {
        user: {}
    },
    reducers: {
        user_details_request: (state) => {
            return {
                ...state,
                loading: true
            }
        },
        user_details_success: (state, action) => {
            return {
                loading: false,
                user: action.payload
            }
        },
        user_details_fail: (state, action) => {
            return {
                loading: false,
                error: action.payload
            }
        },
        user_details_reset: () => {
            return { user: {} }
        }
    }
})

export const { user_details_request, user_details_success, user_details_fail, user_details_reset } = userDetailsSlice.actions

export default userDetailsSlice.reducer