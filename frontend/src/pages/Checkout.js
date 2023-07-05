import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { saveShippingAddress } from '../actions/CartActions';
import { useNavigate } from 'react-router-dom'
import CheckoutSteps from '../components/CheckoutSteps';

const Checkout = () => {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [phone, setPhone] = useState(shippingAddress.phone)
    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ phone, address, city, postalCode, country }))
        navigate('/payment')
    }

    return (
        <div className='row justify-content-center mt-3'>
            <div className="col-12 col-md-6">
                <CheckoutSteps step1 step2 />
                <h2 className="">Checkout</h2>
                <form onSubmit={submitHandler}>
                    <div class="mb-3">
                        <label for="phone" class="form-label">Phone</label>
                        <input type="number" class="form-control border" id="phone" placeholder="Enter Phone number" onChange={(e) => setPhone(e.target.value)} value={phone ? phone : ''} required />
                    </div>

                    <div class="mb-3">
                        <label for="address" class="form-label">Address</label>
                        <input type="text" class="form-control border" id="address" placeholder="Enter Address" onChange={(e) => setAddress(e.target.value)} value={address ? address : ''} required />
                    </div>

                    <div class="mb-3">
                        <label for="city" class="form-label">City</label>
                        <input type="text" class="form-control border" id="city" placeholder="Enter City" onChange={(e) => setCity(e.target.value)} value={city ? city : ''} required />
                    </div>

                    <div class="mb-3">
                        <label for="postalCode" class="form-label">Postal Code</label>
                        <input type="text" class="form-control border" id="postalCode" placeholder="Enter Postal Code" onChange={(e) => setPostalCode(e.target.value)} value={postalCode ? postalCode : ''} required />
                    </div>

                    <div class="mb-3">
                        <label for="country" class="form-label">Country</label>
                        <input type="text" class="form-control border" id="country" placeholder="Enter Country" onChange={(e) => setCountry(e.target.value)} value={country ? country : ''} required />
                    </div>



                    <button type='submit' className='btn bg-primary1 btn-lg'>
                        Checkout
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Checkout;