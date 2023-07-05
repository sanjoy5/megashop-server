import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { savePaymentMethod } from '../actions/CartActions';
import { useNavigate } from 'react-router-dom'
import CheckoutSteps from '../components/CheckoutSteps';

const Payment = () => {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    if (!shippingAddress.address) {
        navigate('/checkout')
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }

    return (
        <div className='row justify-content-center my-3'>
            <div className="col-12 col-md-6">
                <CheckoutSteps step1 step2 step3 />

                <form onSubmit={submitHandler}>
                    <h2 className="">Select Method</h2>
                    <div class="mb-3 form-check">
                        <input type="radio" class="form-check-input" id="paypal" name='paymentMethod' onChange={(e) => setPaymentMethod(e.target.value)} checked />
                        <label class="form-check-label" for="paypal">PayPal or Credit Card</label>
                    </div>

                    <button type='submit' className='btn bg-primary1 btn-lg'>
                        Payment
                    </button>
                </form>

            </div>
        </div>
    );
};

export default Payment;