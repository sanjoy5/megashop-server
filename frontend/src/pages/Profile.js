import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getUserDetails, updateProfile } from '../actions/UserAction'
import Message from '../components/Message'
import Loading from '../components/Loading'
import { Col, Row, Table } from 'react-bootstrap'
import { update_profile_reset } from '../reducers/UpdateProfileReducer'
import { myOrdersList } from '../actions/OrderAction'
import { FaTimes } from 'react-icons/fa';

const Profile = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()



    const userDetails = useSelector(state => state.userDetails)
    const { loading, user, error } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.updateProfile)
    const { success } = userUpdateProfile

    const myOrders = useSelector(state => state.myOrders)
    const { loading: loadingOrders, orders, error: errorOrders } = myOrders

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        } else {
            if (!user || !user.name || success || userInfo._id !== user._id) {
                dispatch(update_profile_reset())
                dispatch(getUserDetails('profile'))
                dispatch(myOrdersList())
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, navigate, userInfo, user, success])

    const submitHandler = (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setMessage('Password do not march')
        } else {
            dispatch(updateProfile({
                'id': user._id,
                'name': name,
                'email': email,
                'password': password
            }))
            setMessage('')
        }

    }

    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>
                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loading />}

                <form onSubmit={submitHandler}>
                    <div class="mb-3">
                        <label for="name" class="form-label">Full Name*</label>
                        <input type="text" class="form-control border" id="name" placeholder="Enter Full Name" onChange={(e) => setName(e.target.value)} value={name} required />
                    </div>

                    <div class="mb-3">
                        <label for="email" class="form-label">Email*</label>
                        <input type="email" class="form-control border" id="email" placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} value={email} required />
                    </div>

                    <div class="mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input type="password" class="form-control border" id="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} value={password} />
                    </div>

                    <div class="mb-3">
                        <label for="confirmPassword" class="form-label">Confirm Password</label>
                        <input type="password" class="form-control border" id="confirmPassword" placeholder="Enter Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} />
                    </div>

                    <button type='submit' className='btn bg-primary1 btn-lg'>
                        Update
                    </button>
                </form>
            </Col>
            <Col md={9}>
                <h2>My Orders</h2>
                {
                    loadingOrders ?
                        <Loading /> :
                        errorOrders ?
                            <Message variant='danger'>{errorOrders}</Message>
                            : <>
                                <Table striped responsive className='table-sm'>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Date</th>
                                            <th>Total</th>
                                            <th>Paid</th>
                                            <th>Delivered</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            orders?.map(order => (
                                                <tr key={order._id}>
                                                    <td>{order._id}</td>
                                                    <td>{order.createdAt.substring(0, 10)}</td>
                                                    <td>${order.totalPrice}</td>
                                                    <td>{order.isPaid ? order.paidAt : <FaTimes className="text-danger" />}</td>
                                                    <td>
                                                        <Link to={`/orders/${order._id}`}>
                                                            <button className="btn bg-primary1">Details</button>
                                                        </Link>
                                                    </td>
                                                    <td></td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </Table>
                            </>
                }
            </Col>
        </Row>
    );
};

export default Profile;