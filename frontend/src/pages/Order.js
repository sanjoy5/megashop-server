import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Message from '../components/Message';
import Loading from '../components/Loading';
import { Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
import { deliverOrder, getOrderDetails, payOrder } from '../actions/OrderAction';
import { PayPalButton } from 'react-paypal-button-v2';
import { order_pay_reset } from '../reducers/OrderPayReducer';
import { order_deliver_reset } from '../reducers/OrderDeliverdReducer';





const Order = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()
    const [sdkReady, setSdkReady] = useState(false)

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, error, loading } = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay

    const orderDeliver = useSelector(state => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    // if (!loading && !error) {
    // }
    const subtotal = order?.orderItems.reduce((acc, item) => acc + parseFloat(item.price) * item.qty, 0).toFixed(2)

    // AQr2YMIxcjE9n6Ylf-n8QTYPLt6quDDUrwv-XRu0vwHNIFhj7IU0AP5T_l8CGkajNLYqaqgyToUs8svP



    const addPaypalScript = () => {
        const script = document.createElement('script')
        script.src = 'https://www.paypal.com/sdk/js?client-id=AQr2YMIxcjE9n6Ylf-n8QTYPLt6quDDUrwv-XRu0vwHNIFhj7IU0AP5T_l8CGkajNLYqaqgyToUs8svP'
        script.async = true
        script.onload = () => {
            setSdkReady(true)
        }
        document.body.appendChild(script)
    }

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        }
        if (!order || successPay || order._id !== Number(id) || successDeliver) {
            dispatch(order_pay_reset())
            dispatch(order_deliver_reset())
            dispatch(getOrderDetails(id))
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPaypalScript()
            } else {
                setSdkReady(true)
            }
        }
    }, [dispatch, navigate, userInfo, order, id, successPay, successDeliver])

    const successPaymenthandler = (paymentResult) => {
        dispatch(payOrder(id, paymentResult))
    }

    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }


    return (
        <div className='my-3'>
            {
                loading ? (
                    <Loading />
                ) : error ? (
                    <Message variant='danger'>{error}</Message>
                ) : (
                    <>
                        <h2>Order: {order._id}</h2>
                        <div className="row">
                            <div className="col-md-8">

                                <ListGroup variant='flush' className='mt-3'>
                                    <ListGroup.Item>
                                        <h2>Shipping</h2>
                                        <p><strong>Name: </strong>{order.user.name}</p>
                                        <p><strong>Email: </strong>{order.user.email}</p>
                                        <p>

                                            <strong>Address: </strong>
                                            {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                                        </p>

                                        {
                                            order.isDelivered ? (
                                                <Message variant='success'>Delivered on {order.deliveredAt}</Message>
                                            ) : (
                                                <Message variant='warning'>Not Delivered</Message>
                                            )
                                        }


                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <h2>Payment Method</h2>
                                        <p>
                                            <strong>Method: </strong>
                                            {order.paymentMethod}
                                        </p>

                                        {
                                            order.isPaid ? (
                                                <Message variant='success'>Paid on {order.paidAt}</Message>
                                            ) : (
                                                <Message variant='warning'>Not Paid</Message>
                                            )
                                        }

                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <h2>Order Items</h2>
                                        {
                                            order?.orderItems.length === 0 ? <Message variant='info'>Order is Empty</Message> : (
                                                <ListGroup variant='flush'>
                                                    {
                                                        order?.orderItems.map((item, index) => (
                                                            <ListGroup.Item key={index}>
                                                                <Row className='align-items-center'>
                                                                    <Col md={1}>
                                                                        <Image src={item.image} alt={item.name} fluid rounded />
                                                                    </Col>
                                                                    <Col>
                                                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                                    </Col>
                                                                    <Col md={4}>
                                                                        {item.qty} X ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                                                    </Col>
                                                                </Row>
                                                            </ListGroup.Item>
                                                        ))
                                                    }
                                                </ListGroup>
                                            )
                                        }

                                    </ListGroup.Item>
                                </ListGroup>
                            </div>
                            <div className="col-md-4">
                                <Card className='card-body'>
                                    <ListGroup variant='flush'>
                                        <ListGroup.Item>
                                            <h2>Order Summery</h2>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Subtotal:</Col>
                                                <Col>${subtotal}</Col>
                                            </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Shipping:</Col>
                                                <Col>${order.shippingPrice}</Col>
                                            </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Tax:</Col>
                                                <Col>${order.taxPrice}</Col>
                                            </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Total:</Col>
                                                <Col>${order.totalPrice}</Col>
                                            </Row>
                                        </ListGroup.Item>

                                        {
                                            !order.isPaid && (
                                                <ListGroup.Item>
                                                    {loadingPay && <Loading />}
                                                    {!sdkReady ? (
                                                        <Loading />
                                                    ) : (
                                                        <PayPalButton
                                                            amount={order.totalPrice}
                                                            onSuccess={successPaymenthandler}
                                                        />

                                                    )
                                                    }
                                                </ListGroup.Item>
                                            )
                                        }

                                        {loadingDeliver && <Loading />}

                                        {
                                            userInfo && userInfo.isAdmin && order?.isPaid && !order?.isDelivered && (
                                                <ListGroup.Item>
                                                    <button onClick={deliverHandler} className="btn mt-2 bg-primary1 w-100">Mark As Deliver</button>
                                                </ListGroup.Item>
                                            )
                                        }

                                    </ListGroup>



                                </Card>

                            </div>
                        </div>
                    </>
                )
            }


        </div>
    );
};

export default Order;

