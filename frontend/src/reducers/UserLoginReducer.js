import { createSlice } from '@reduxjs/toolkit'

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

const usersLoginSlice = createSlice({
    name: 'userLogin',
    initialState: {
        userInfo: userInfoFromStorage,
    },
    reducers: {
        user_login_request: (state) => {
            state.loading = true
        },
        user_login_success: (state, action) => {
            return {
                loading: false,
                userInfo: action.payload
            }
        },
        user_login_fail: (state, action) => {
            return {
                loading: false,
                error: action.payload
            }
        },
        user_logout: () => {
            return {}
        },
    }
})

export const { user_login_request, user_login_success, user_login_fail, user_logout } = usersLoginSlice.actions
export default usersLoginSlice.reducer