import { useEffect } from "react"
import { Card, Col, Image, ListGroup, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"
import { addToCart, removeFromCart } from "../actions/CartActions"
import { FaTrashAlt } from "react-icons/fa"
import Message from "../components/Message"

const Cart = () => {
    const location = useLocation()
    const { pId } = useParams()
    const qty = location.search ? Number(location.search.split('=')[1]) : 1
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart;
    // console.log(cartItems);
    const navigate = useNavigate()


    useEffect(() => {
        if (pId) {
            dispatch(addToCart(pId, qty))
        }
    }, [dispatch, pId, qty])

    const removeFromCarthandler = id => {
        console.log(id);
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        navigate('/login?redirect=checkout')
    }



    return (
        <div className="mt-4">
            {/* <Link to="/" className='btn bg-primary1 fs-5 mb-4'><FiArrowLeft className='me-1' />Go Back </Link> */}

            <Row>
                <Col md={8}>
                    <h1 className="fs-3">Shooping Cart</h1>
                    {
                        cartItems?.length === 0 ? (
                            <Message variant='info'>
                                Your Cart is Empty <Link to="/" className='ms-1 fs-5'>Go Back </Link>
                            </Message>
                        ) : (
                            <ListGroup variant="flush">
                                {
                                    cartItems?.map(item => (
                                        <ListGroup.Item key={item.product}>
                                            <Row className="align-items-center">
                                                <Col md={2}>
                                                    <Image src={item.image} fluid rounded height={60} width={60} />
                                                </Col>
                                                <Col md={4}>
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </Col>
                                                <Col md={2}>
                                                    ${item.price}
                                                </Col>
                                                <Col md={2}>
                                                    x<input type="number" style={{ width: '50px', padding: "" }} value={item.qty} onChange={(e) => dispatch(addToCart(item.product, e.target.value))} min={1} max={item.countInStock} className='fs-5 border-0' />
                                                </Col>
                                                <Col md={1}>

                                                    <FaTrashAlt onClick={() => removeFromCarthandler(item.product)} className="fs-5 text-danger cursor-pointer" />

                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))
                                }
                            </ListGroup>
                        )

                    }
                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <p className="fs-4">Subtotal ({cartItems.reduce((acc, item) => parseInt(item.qty) + acc, 0)}) items</p>

                                <p className="fs-5">
                                    Total: ${cartItems.reduce((acc, item) => parseInt(item.qty) * parseInt(item.price) + acc, 0).toFixed(2)}
                                </p>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <div className="w-100">
                                    <button onClick={checkoutHandler} className="btn bg-primary1 py-2 w-100" disabled={cartItems.length === 0}>
                                        Proceed To Checkout
                                    </button>
                                </div>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>

            </Row>

        </div>
    )
}

export default Cart