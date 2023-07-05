import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Message from '../components/Message'
import Loading from '../components/Loading'
import { Table } from 'react-bootstrap'
import { FaCheck } from 'react-icons/fa';
import { ordersList } from '../actions/OrderAction'

const AllOrders = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const allOrders = useSelector(state => state.orders)
    const { loading, error, orders } = allOrders

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin



    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(ordersList())
        } else {
            navigate('/login')
        }
    }, [dispatch, navigate, userInfo])


    return (
        <div>
            <h1>Orders</h1>
            {
                loading ?
                    <Loading /> :
                    error ?
                        <Message variant='danger'>{error}</Message>
                        : <>
                            <Table striped bordered hover responsive className='table-sm'>
                                <thead className='text-center'>
                                    <tr>
                                        <th>ID</th>
                                        <th>User</th>
                                        <th>Date</th>
                                        <th>Total</th>
                                        <th>Paid</th>
                                        <th>Delivered</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {orders?.map(order => (
                                        <tr key={order._id} className='text-center'>
                                            <td>  {order._id}</td>
                                            <td>  {order.user && order.user.name}</td>
                                            <td>  {order.createdAt.substring(0, 10)}</td>
                                            <td>  ${order.totalPrice}</td>
                                            <td>
                                                {order.isPaid ? (
                                                    order.paidAt.substring(0, 10)
                                                ) : (
                                                    <FaCheck className='text-danger' />
                                                )}
                                            </td>
                                            <td>
                                                {order?.isDelivered ? (
                                                    order.deliveredAt.substring(0, 10)
                                                ) : (
                                                    <FaCheck className='text-danger' />
                                                )}
                                            </td>
                                            <td>
                                                <Link to={`/orders/${order._id}`}>
                                                    <button className="btn bg-primary1 btn-sm me-2">
                                                        Details
                                                    </button>
                                                </Link>

                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                            </Table>



                        </>
            }
        </div>
    );
};

export default AllOrders;