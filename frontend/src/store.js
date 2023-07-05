import { configureStore } from '@reduxjs/toolkit'
import ProductReducers from './reducers/ProductReducers'
import cartReducers from './reducers/cartReducers'
import UserLoginReducer from './reducers/UserLoginReducer'
import UserRegisterReducer from './reducers/UserRegisterReducer'
import UserDetailsReducer from './reducers/UserDetailsReducer'
import UpdateProfileReducer from './reducers/UpdateProfileReducer'
import OrderReducers from './reducers/OrderReducers'
import OrderDetailsReducers from './reducers/OrderDetailsReducers'
import OrderPayReducer from './reducers/OrderPayReducer'
import MyOrderReducers from './reducers/MyOrderReducers'
import UsersReducers from './reducers/UsersReducers'
import UserDeleteReducers from './reducers/UserDeleteReducers'
import UserUpdateReducer from './reducers/UserUpdateReducer'
import DeleteProductReducers from './reducers/DeleteProductReducers'
import ProductCreateReducer from './reducers/ProductCreateReducer'
import UpdateProuductReducer from './reducers/UpdateProuductReducer'
import OrdersReducers from './reducers/OrdersReducers'
import OrderDeliverdReducer from './reducers/OrderDeliverdReducer'
import CreateReviewReducer from './reducers/CreateReviewReducer'
import ProductDetailsReducers from './reducers/ProductDetailsReducers'
import ProductTopReducers from './reducers/ProductTopReducers'

export const store = configureStore({
    reducer: {
        allProducts: ProductReducers,
        productDetails: ProductDetailsReducers,
        productsTop: ProductTopReducers,
        productCreate: ProductCreateReducer,
        productUpdate: UpdateProuductReducer,
        productDelete: DeleteProductReducers,
        createReview: CreateReviewReducer,

        cart: cartReducers,
        userLogin: UserLoginReducer,
        userRegister: UserRegisterReducer,
        userDetails: UserDetailsReducer,
        updateProfile: UpdateProfileReducer,
        usersList: UsersReducers,
        userUpdate: UserUpdateReducer,
        userDelete: UserDeleteReducers,

        orderCreate: OrderReducers,
        orderDetails: OrderDetailsReducers,
        orderPay: OrderPayReducer,
        myOrders: MyOrderReducers,
        orders: OrdersReducers,
        orderDeliver: OrderDeliverdReducer,
    }
})

