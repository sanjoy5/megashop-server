import { createSlice } from '@reduxjs/toolkit'


const usersRegSlice = createSlice({
    name: 'usersRegister',
    initialState: {

    },
    reducers: {
        user_register_request: (state) => {
            state.loading = true
        },
        user_register_success: (state, action) => {
            return {
                loading: false,
                userInfo: action.payload
            }
        },

        user_regiser_fail: (state, action) => {
            return {
                loading: false,
                error: action.payload
            }
        }

    }
})

export const { user_register_request, user_register_success, user_regiser_fail } = usersRegSlice.actions
export default usersRegSlice.reducer