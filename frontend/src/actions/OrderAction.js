
import axios from 'axios';
import { order_create_fail, order_create_request, order_create_success } from '../reducers/OrderReducers';
import { cart_clear_items } from '../reducers/cartReducers';
import { order_details_fail, order_details_request, order_details_success } from '../reducers/OrderDetailsReducers';
import { order_pay_fail, order_pay_request, order_pay_success } from '../reducers/OrderPayReducer';
import { myorder_fail, myorder_request, myorder_success } from '../reducers/MyOrderReducers';
import { orders_fail, orders_request, orders_success } from '../reducers/OrdersReducers';
import { order_deliver_fail, order_deliver_request, order_deliver_success } from '../reducers/OrderDeliverdReducer';



export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch(order_create_request())

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post(`/api/orders/add/`,
            order,
            config
        )

        dispatch(order_create_success(data))

        dispatch(cart_clear_items(data))
        localStorage.removeItem('cartItems')

    } catch (error) {
        dispatch(order_create_fail(
            error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        ))
    }
}



export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch(order_details_request())

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`/api/orders/${id}/`,
            config
        )

        dispatch(order_details_success(data))

    } catch (error) {
        dispatch(order_details_fail(
            error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        ))
    }
}

export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch(order_pay_request())

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
            `/api/orders/${id}/pay/`,
            paymentResult,
            config
        )

        dispatch(order_pay_success(data))

    } catch (error) {
        dispatch(order_pay_fail(
            error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        ))
    }
}


export const myOrdersList = () => async (dispatch, getState) => {
    try {
        dispatch(myorder_request())

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
            '/api/orders/myorders/',
            config
        )

        dispatch(myorder_success(data))

    } catch (error) {
        dispatch(myorder_fail(
            error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        ))
    }
}

export const ordersList = () => async (dispatch, getState) => {
    try {
        dispatch(orders_request())

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
            '/api/orders/',
            config
        )

        dispatch(orders_success(data))

    } catch (error) {
        dispatch(orders_fail(
            error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        ))
    }
}



export const deliverOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch(order_deliver_request())

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
            `/api/orders/${order._id}/deliver/`,
            {},
            config
        )

        dispatch(order_deliver_success(data))

    } catch (error) {
        dispatch(order_deliver_fail(
            error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        ))
    }
}