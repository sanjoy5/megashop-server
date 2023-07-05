import { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import { useDispatch, useSelector } from 'react-redux';
import { allProducts } from '../actions/ProductActions';
import Loading from '../components/Loading';
import Message from '../components/Message';
import { useLocation } from 'react-router-dom';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';


const Home = () => {

    const allproducts = useSelector((state) => state.allProducts)
    const dispatch = useDispatch()
    const { loading, products, error, page, pages } = allproducts

    const location = useLocation()
    const keyword = location.search

    // const keyword = location.search && location.search.split('=')[1]



    useEffect(() => {
        dispatch(allProducts(keyword))
    }, [dispatch, keyword])


    return (
        <div>
            {!keyword && <ProductCarousel />}

            <h2 className='mt-5'>Latest Products</h2>

            {
                loading ? <Loading />
                    : error ? <Message variant='danger'>{error}</Message>
                        : <>
                            <Row>
                                {
                                    products.map(product => (
                                        <Col sm={12} md={6} lg={4} key={product._id}>
                                            <Product product={product} />
                                        </Col>
                                    ))
                                }
                            </Row>

                            <Paginate page={page} pages={pages} keyword={keyword} />

                        </>
            }


        </div>
    )
}

export default Home