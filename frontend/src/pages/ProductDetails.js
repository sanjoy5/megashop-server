import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Row, Col, Image, Button, ListGroup } from 'react-bootstrap';
import Rating from '../components/Rating'
// import products from '../products'
import { FiArrowLeft } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux';

import Loading from '../components/Loading';
import Message from '../components/Message';
import { createProductReview, singleProduct } from '../actions/ProductActions';
import { create_review_reset } from '../reducers/CreateReviewReducer';
import { product_details_reset } from '../reducers/ProductDetailsReducers';

const ProductDetails = () => {
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const productDetail = useSelector((state) => state.productDetails)
    const { loading, product, error } = productDetail

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const createReview = useSelector((state) => state.createReview)
    const { loading: loadingReview, success: successReview, error: errorReview } = createReview


    const dispatch = useDispatch()
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (successReview) {
            setRating(0)
            setComment('')
            dispatch(create_review_reset())
        }


        if (id && product._id !== "") {
            dispatch(singleProduct(id))
        }

        return () => {
            dispatch(product_details_reset())
        }

    }, [id, dispatch, successReview])


    // const product = products.find(p => p._id === id) 
    // const product = useLoaderData()

    const { description, brand, name, image, category, price, rating: productRating, numReviews, countInStock } = product;




    const addToCartHandler = () => {
        navigate(`/cart/${id}?qty=${qty}`)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(
            id, {
            rating,
            comment
        }
        ))
    }

    return (
        <>

            <Link to="/" className='btn bg-primary1 fs-5 mb-4'><FiArrowLeft className='me-1' />Go Back </Link>
            {
                loading ? <Loading />
                    : error ? <Message variant='danger'>{error}</Message>
                        : <>
                            <Row>
                                <Col md={6}>
                                    <div className="px-lg-5 border">
                                        <Image src={image} className=' w-100' alt={name} />
                                    </div>
                                </Col>
                                <Col md={6}>

                                    <div className="fs-5"><a className='text-primary' href="/">Home</a> / {category}</div>
                                    <h3>{name}</h3>


                                    <Rating value={productRating} text={`${numReviews} reviews`} color={'#FF982E'} />
                                    <p className="fs-5 mt-3"><strong>Price: </strong>  {price}</p>
                                    <p className="fs-5 mt-3"><strong>Status: </strong>  {countInStock > 0 ? "In Stock" : "Out of Stock"} </p>

                                    <div className="d-flex align-items-center gap-4">
                                        {
                                            countInStock > 0 && (
                                                <div className='d-flex align-items-center gap-2'>
                                                    <strong>Qty: </strong>
                                                    {/* <Form.Control
                                                        as='select'
                                                        value={qty}
                                                        onChange={(e) => setQty(e.target.value)}
                                                        style={{ width: '60px' }}
                                                    >

                                                        {
                                                            // [0,1,2,3,4...] 
                                                            [...Array(countInStock).keys()].map(x => (
                                                                <option key={x+1} value={x+1}>
                                                                    {x + 1}
                                                                </option>
                                                            ))
                                                        }

                                                    </Form.Control> */}

                                                    <input type="number" style={{ width: '60px', padding: "7px 4px 7px 7px" }} value={qty} onChange={(e) => setQty(e.target.value)} min={1} max={countInStock} className='fs-5 border' />
                                                </div>
                                            )
                                        }

                                        <Button onClick={addToCartHandler} className='bg-secondary1 py-2 px-4 fs-5 cursor-pointer' type='button' disabled={countInStock === 0}>Add to Cart</Button>
                                    </div>

                                    <p className="fs-5 mt-3"><strong>Description:</strong>  {description}</p>

                                    <p className="fs-5 mt-3"><strong>Brand: </strong>  {brand}</p>
                                </Col>
                            </Row>

                            <Row className='mt-5'>
                                <Col md={6}>
                                    <ListGroup variant='flush'>
                                        <ListGroup.Item>
                                            <h4>Write a review</h4>
                                            {loadingReview && <Loading />}
                                            {successReview && <Message variant='success'>Review Submited</Message>}
                                            {errorReview && <Message variant='danger'>{errorReview}</Message>}

                                            {
                                                userInfo ? (
                                                    <form onSubmit={submitHandler}>

                                                        <div class="mb-3">
                                                            <label for="rating" class="form-label">Rating</label>
                                                            <select class="form-select" value={rating} onChange={(e) => setRating(e.target.value)}>
                                                                <option value=''>Select...</option>
                                                                <option value="1">1 - Poor</option>
                                                                <option value="2">2 - Fair</option>
                                                                <option value="3">3 - Good</option>
                                                                <option value="4">4 -Very Good</option>
                                                                <option value="5">5 - Excellent</option>
                                                            </select>
                                                        </div>

                                                        <div class="mb-3">
                                                            <label for="comment" class="form-label">Commnet</label>
                                                            <textarea class="form-control" id="comment" value={comment} onChange={(e) => setComment(e.target.value)} rows="3"></textarea>
                                                        </div>

                                                        <button type='submit' className="btn bg-primary1" disabled={loadingReview}>Submit</button>

                                                    </form>
                                                ) : (
                                                    <Message variant='info'>Please <Link to='/login'>Login</Link> to write a review</Message>
                                                )
                                            }
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                                <Col md={6}>
                                    <h3>Reviews</h3>
                                    {
                                        product.reviews.length === 0 && <Message variant='info'>No Reviews</Message>
                                    }
                                    <ListGroup variant='flush'>
                                        {
                                            product?.reviews?.map(review => (
                                                <ListGroup.Item key={review._id}>
                                                    <strong>{review.name}</strong>
                                                    <Rating value={review.rating} color='#FF982E' />
                                                    <p>{review.createdAt.substring(0, 10)}</p>
                                                    <p>{review.comment}</p>
                                                </ListGroup.Item>
                                            ))
                                        }
                                    </ListGroup>
                                </Col>

                            </Row>

                        </>
            }


        </>
    )
}

export default ProductDetails