import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../actions/UserAction'
import Message from '../components/Message'
import Loading from '../components/Loading'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userLogin = useSelector(state => state.userLogin)
    const { loading, userInfo, error } = userLogin

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }



    return (
        <div className='container my-5'>


            <div className="row align-items-center py-md-4">

                {
                    loading && <Loading />
                }
                <div className="col-md-6 order-1 order-md-0">
                    <img src="https://i.ibb.co/2WwR4g9/login.png" className='w-100' alt="" />
                </div>
                <div className="col-md-6 mb-5 mb-md-0 order-0 order-md-1">
                    {error && <Message variant='danger'>{error}</Message>}
                    <h2 className='mb-3'>Sign In</h2>
                    <form onSubmit={submitHandler}>
                        <div class="mb-3">
                            <label for="email" class="form-label">Email address</label>
                            <input type="email" class="form-control border" id="email" placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} value={email} />
                        </div>

                        <div class="mb-3">
                            <label for="password" class="form-label">Password</label>
                            <input type="password" class="form-control border" id="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} value={password} />
                        </div>

                        <button type='submit' className='btn bg-primary1 btn-lg'>
                            Sign In
                        </button>
                    </form>

                    <p className="mt-3">New to MegaShop? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link></p>
                </div>

            </div>

        </div>
    )
}

export default Login