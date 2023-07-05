
import { createSlice } from "@reduxjs/toolkit";


const cartItemsFromStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) : []

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ?
    JSON.parse(localStorage.getItem('shippingAddress')) : {}

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage
    },
    reducers: {
        add_cart_item: (state, action) => {
            const item = action.payload
            const existItem = state.cartItems.find(x => x.product === item.product)
            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(x =>
                        x.product === existItem.product ? item : x
                    )
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        },
        cart_remove_item: (state, action) => {
            console.log(action, 'action');
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x.product !== action.payload)
            }
        },

        cart_shipping_address: (state, action) => {
            return {
                ...state,
                shippingAddress: action.payload
            }
        },

        save_payment_method: (state, action) => {
            return {
                ...state,
                paymentMethod: action.payload
            }
        },

        cart_clear_items: (state, action) => {
            return {
                ...state,
                cartItems: []
            }
        },

    }

})

export const { add_cart_item, cart_remove_item, cart_shipping_address, save_payment_method, cart_clear_items } = cartSlice.actions
export default cartSlice.reducer