import { delete_product_fail, delete_product_request, delete_product_success } from "../reducers/DeleteProductReducers";
import { product_create_fail, product_create_request, product_create_success } from "../reducers/ProductCreateReducer";
import { getProducts, isError, isLoading } from "../reducers/ProductReducers"
import axios from 'axios';
import { update_product_fail, update_product_request, update_product_success } from "../reducers/UpdateProuductReducer";
import { create_review_fail, create_review_request, create_review_success } from "../reducers/CreateReviewReducer";
import { product_details_fail, product_details_request, product_details_success } from "../reducers/ProductDetailsReducers";
import { product_top_fail, product_top_request, product_top_success } from "../reducers/ProductTopReducers";

export const allProducts = (keyword = '') => async (dispatch) => {
    try {
        dispatch(isLoading())

        const { data } = await axios.get(`/api/products${keyword}`)
        dispatch(getProducts(data))

    } catch (error) {
        dispatch(isError(
            error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        ))
    }
}

export const singleProduct = (id) => async (dispatch) => {
    try {
        dispatch(product_details_request())

        const { data } = await axios.get(`/api/products/${id}`)
        dispatch(product_details_success(data))

    } catch (error) {
        dispatch(product_details_fail(
            error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        ))
    }
}


export const topProducts = () => async (dispatch) => {
    try {
        dispatch(product_top_request())

        const { data } = await axios.get(`/api/products/top/`)
        dispatch(product_top_success(data))

    } catch (error) {
        dispatch(product_top_fail(
            error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        ))
    }
}




export const createProduct = () => async (dispatch, getState) => {
    try {
        dispatch(product_create_request())

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post(
            `/api/products/create/`,
            {},
            config
        )

        dispatch(product_create_success(data))

    } catch (error) {
        dispatch(product_create_fail(
            error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        ))
    }
}



export const updateProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch(update_product_request())

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(
            `/api/products/update/${product._id}/`,
            product,
            config
        )

        dispatch(update_product_success(data))

        dispatch(product_details_success(data))

    } catch (error) {
        dispatch(update_product_fail(
            error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        ))
    }
}




export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch(delete_product_request())

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.delete(
            `/api/products/delete/${id}/`,
            config
        )

        dispatch(delete_product_success(data))

    } catch (error) {
        dispatch(delete_product_fail(
            error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        ))
    }
}



export const createProductReview = (productId, review) => async (dispatch, getState) => {
    try {
        dispatch(create_review_request())

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post(
            `/api/products/${productId}/reviews/`,
            review,
            config
        )
        dispatch(create_review_success(data))

    } catch (error) {
        dispatch(create_review_fail(
            error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        ))
    }
}

