import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { register } from '../actions/UserAction'
import Message from '../components/Message'
import Loading from '../components/Loading'

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userRegister = useSelector(state => state.userRegister)
    const { loading, userInfo, error } = userRegister

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setMessage('Password do not march')
            return
        } else {
            dispatch(register(name, email, password))
        }

    }


    return (

        <div className='container my-5'>


            <div className="row align-items-center py-md-4">

                {
                    loading && <Loading />
                }

                <div className="col-md-6 mb-5 mb-md-0">
                    {message && <Message variant='danger'>{message}</Message>}
                    {error && <Message variant='danger'>{error}</Message>}
                    <h2 className='mb-3'>Register</h2>
                    <form onSubmit={submitHandler}>
                        <div class="mb-3">
                            <label for="name" class="form-label">Full Name</label>
                            <input type="text" class="form-control border" id="name" placeholder="Enter Full Name" onChange={(e) => setName(e.target.value)} value={name} required />
                        </div>

                        <div class="mb-3">
                            <label for="email" class="form-label">Email address</label>
                            <input type="email" class="form-control border" id="email" placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} value={email} required />
                        </div>

                        <div class="mb-3">
                            <label for="password" class="form-label">Password</label>
                            <input type="password" class="form-control border" id="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} value={password} required />
                        </div>

                        <div class="mb-3">
                            <label for="confirmPassword" class="form-label">Confirm Password</label>
                            <input type="password" class="form-control border" id="confirmPassword" placeholder="Enter Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} required />
                        </div>

                        <button type='submit' className='btn bg-primary1 btn-lg'>
                            Register
                        </button>
                    </form>

                    <p className="mt-3">Already Have an Account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link></p>
                </div>

                <div className="col-md-6">
                    <img src="https://i.ibb.co/2WwR4g9/login.png" className='w-100' alt="" />
                </div>

            </div>

        </div>

    );
};

export default Register;