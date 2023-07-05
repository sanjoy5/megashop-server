import React from 'react'
import {
    createBrowserRouter
} from "react-router-dom";
import Home from './pages/Home';
import Main from './layout/Main';
import Cart from './pages/Cart';
import Login from './pages/Login';
import ProductDetails from './pages/ProductDetails';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Checkout from './pages/Checkout';
import Payment from './pages/Payment';
import PlaceOrder from './pages/PlaceOrder';
import Order from './pages/Order';
import Users from './pages/Users';
import UserEdit from './pages/UserEdit';
import Products from './pages/Products';
import ProductEdit from './pages/ProductEdit';
import AllOrders from './pages/AllOrders';


const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: "/",
                element: <Home />,
                loader: () => fetch('/api/products/')
            },
            {
                path: "/product/:id",
                element: <ProductDetails />,
                loader: ({ params }) => fetch(`/api/products/${params.id}/`)
            },
            {
                path: "/cart/:pId?",
                element: <Cart />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/admin/users",
                element: <Users />,
            },
            {
                path: "/admin/user/:id/edit",
                element: <UserEdit />,
            },

            {
                path: "/admin/products",
                element: <Products />,
            },
            {
                path: "/admin/product/:id/edit",
                element: <ProductEdit />,
            },
            {
                path: "/profile",
                element: <Profile />,
            },
            {
                path: "/checkout",
                element: <Checkout />,
            },
            {
                path: "/payment",
                element: <Payment />,
            },
            {
                path: "/placeorder",
                element: <PlaceOrder />,
            },
            {
                path: "/admin/orders",
                element: <AllOrders />,
            },
            {
                path: "/orders/:id",
                element: <Order />,
            },
        ],
    },
]);

export default router 