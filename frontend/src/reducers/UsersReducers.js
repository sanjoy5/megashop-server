import { createSlice } from "@reduxjs/toolkit";


const usersSlice = createSlice({
    name: 'usersList',
    initialState: {
        users: []
    },
    reducers: {
        users_request: () => {
            return {
                loading: true
            }
        },
        users_success: (state, action) => {
            return {
                loading: false,
                users: action.payload
            }
        },
        users_fail: (state, action) => {
            return {
                loading: false,
                error: action.payload
            }
        },
        users_reset: () => {
            return {
                users: []
            }
        }

    }
})

export const { users_request, users_success, users_fail, users_reset } = usersSlice.actions
export default usersSlice.reducer