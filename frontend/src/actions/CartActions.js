import axios from "axios";
import { add_cart_item, cart_remove_item, cart_shipping_address, save_payment_method } from "../reducers/cartReducers";


export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`)

    dispatch(add_cart_item({
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty
    }))
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}


export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch(cart_remove_item(id))
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}



export const saveShippingAddress = (data) => (dispatch) => {
    dispatch(cart_shipping_address(data))
    localStorage.setItem('shippingAddress', JSON.stringify(data))
}


export const savePaymentMethod = (data) => (dispatch) => {
    dispatch(save_payment_method(data))
    localStorage.setItem('paymentMethod', JSON.stringify(data))
}