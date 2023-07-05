import React, { useEffect } from 'react';
import { Carousel, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import Message from './Message';
import { topProducts } from '../actions/ProductActions';
import Rating from './Rating';


const ProductCarousel = () => {
    const dispatch = useDispatch()

    const productsTop = useSelector(state => state.productsTop)
    const { error, loading, products } = productsTop

    useEffect(() => {
        dispatch(topProducts())
    }, [dispatch])

    return (
        <>
            {
                loading ? <Loading />
                    : error ? <Message variant='danger'>{error}</Message>
                        : <>
                            <Carousel pause='hover' className='bg-dark mx-2' style={{ height: "400px" }}>
                                {
                                    products.map(product => (
                                        <Carousel.Item key={product._id}>
                                            <div className='d-flex flex-column flex-md-row align-items-center slider ' style={{ height: "400px" }}>
                                                <Link to={`/product/${product._id}`} className='w-100 w-md-50 d-flex align-items-center justify-content-center h-100'>
                                                    <Image src={product.image} alt={product.name} className='rounded-3' />
                                                </Link>
                                                {/* <Carousel.Caption className='carousel.caption'>
                                                    <h4>{product.name} (${product.price})</h4>
                                                </Carousel.Caption> */}
                                                <div className='w-100 w-md-50 text-white h-100 d-flex align-items-center align-items-md-start justify-content-center flex-column'>
                                                    <Link to={`/product/${product._id}`} className='text-white'>
                                                        <h4>{product.name} </h4>
                                                    </Link>
                                                    <h5>${product.price}</h5>
                                                    <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#FF982E'} />
                                                    <Link to={`/product/${product._id}`} className='btn bg-primary1 btn-sm mt-3'>Shop Now</Link>
                                                </div>
                                            </div>
                                        </Carousel.Item>
                                    ))
                                }
                            </Carousel>
                        </>
            }

        </>
    );
};

export default ProductCarousel;