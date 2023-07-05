import axios from "axios"
import { user_login_fail, user_login_request, user_login_success, user_logout } from "../reducers/UserLoginReducer"
import { user_regiser_fail, user_register_request, user_register_success } from "../reducers/UserRegisterReducer"
import { user_details_fail, user_details_request, user_details_reset, user_details_success } from "../reducers/UserDetailsReducer"
import { update_profile_fail, update_profile_request, update_profile_success } from "../reducers/UpdateProfileReducer"
import { myorder_reset } from "../reducers/MyOrderReducers"
import { users_fail, users_request, users_reset, users_success } from "../reducers/UsersReducers"
import { user_delete_fail, user_delete_request, user_delete_success } from "../reducers/UserDeleteReducers"
import { user_update_fail, user_update_request, user_update_success } from "../reducers/UserUpdateReducer"


export const login = (email, password) => async (dispatch) => {
    try {
        dispatch(user_login_request())

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const { data } = await axios.post(
            '/api/users/login/',
            { 'username': email, 'password': password },
            config
        )

        dispatch(user_login_success(data))

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch(user_login_fail(
            error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        ))
    }
}


export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch(user_logout())
    dispatch(user_details_reset())
    dispatch(myorder_reset())
    dispatch(users_reset())
}



export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch(user_register_request())

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const { data } = await axios.post(
            '/api/users/register/',
            { 'name': name, 'email': email, 'password': password },
            config
        )

        dispatch(user_register_success(data))

        dispatch(user_login_success(data))

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch(user_regiser_fail(
            error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        ))
    }
}



export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch(user_details_request())

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(
            `/api/users/${id}/`,
            config
        )

        dispatch(user_details_success(data))


    } catch (error) {
        dispatch(user_details_fail(
            error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        ))
    }
}



export const updateProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch(update_profile_request())

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(
            `/api/users/profile/update/`,
            user,
            config
        )

        dispatch(update_profile_success(data))

        dispatch(user_login_success(data))

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch(update_profile_fail(
            error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        ))
    }
}




export const listUsers = () => async (dispatch, getState) => {
    try {
        dispatch(users_request())

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(
            `/api/users/`,
            config
        )

        dispatch(users_success(data))


    } catch (error) {
        dispatch(users_fail(
            error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        ))
    }
}

export const deleteUser = (id) => async (dispatch, getState) => {
    try {
        dispatch(user_delete_request())

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.delete(
            `/api/users/delete/${id}/`,
            config
        )

        dispatch(user_delete_success(data))


    } catch (error) {
        dispatch(user_delete_fail(
            error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        ))
    }
}

export const updateUser = (user) => async (dispatch, getState) => {
    try {
        dispatch(user_update_request())

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(
            `/api/users/update/${user._id}/`,
            user,
            config
        )

        dispatch(user_update_success(data))

        dispatch(user_details_success(data))


    } catch (error) {
        dispatch(user_update_fail(
            error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        ))
    }
}
