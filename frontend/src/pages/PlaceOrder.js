import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import CheckoutSteps from '../components/CheckoutSteps';
import Message from '../components/Message';
import { Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
import { createOrder } from '../actions/OrderAction';
import { order_create_reset } from '../reducers/OrderReducers';



const PlaceOrder = () => {
    const orderCreate = useSelector(state => state.orderCreate)
    const { order, error, success } = orderCreate

    const cart = useSelector(state => state.cart)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const subtotal = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    const shippingPrice = (subtotal > 100 ? 0 : 10).toFixed(2)
    const taxPrice = ((0.05) * subtotal).toFixed(2)
    const totalPrice = (Number(subtotal) + Number(shippingPrice) + Number(taxPrice)).toFixed(2)

    if (!cart.paymentMethod) {
        navigate('/payment')
    }

    useEffect(() => {
        if (success) {
            navigate(`/orders/${order._id}`)
            dispatch(order_create_reset())
        }
    }, [success, navigate])

    const placeOrder = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: subtotal,
            shippingPrice: shippingPrice,
            taxPrice: taxPrice,
            totalPrice: totalPrice,

        }))
    }

    return (
        <div className='my-3'>
            <CheckoutSteps step1 step2 step3 step4 />
            <div className="row">
                <div className="col-md-8">


                    <ListGroup variant='flush' className='mt-3'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>

                                <strong>Phone: </strong>
                                {cart.shippingAddress.phone},
                                <br />
                                <strong>Address: </strong>
                                {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {cart.paymentMethod}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {
                                cart.cartItems.length === 0 ? <Message variant='info'>Your Cart is Empty</Message> : (
                                    <ListGroup variant='flush'>
                                        {
                                            cart.cartItems.map((item, index) => (
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
                                    <Col>${shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>${taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>${totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <button onClick={placeOrder} type='submit' className='btn bg-primary1 btn-lg w-100'>
                                    Place Order
                                </button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>

                </div>
            </div>
        </div>
    );
};

export default PlaceOrder;