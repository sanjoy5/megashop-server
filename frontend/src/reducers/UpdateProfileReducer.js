import { createSlice } from "@reduxjs/toolkit";


const updateProfileSlice = createSlice({
    name: 'updateProfile',
    initialState: {

    },
    reducers: {
        update_profile_request: () => {
            return {
                loading: true
            }
        },
        update_profile_success: (state, action) => {
            return {
                loading: false,
                success: true,
                userInfo: action.payload
            }
        },
        update_profile_fail: (state, action) => {
            return {
                loading: false,
                error: action.payload
            }
        },
        update_profile_reset: () => {
            return {}
        }

    }
})

export const { update_profile_request, update_profile_success, update_profile_fail, update_profile_reset } = updateProfileSlice.actions
export default updateProfileSlice.reducer