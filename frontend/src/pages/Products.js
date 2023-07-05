import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Message from '../components/Message'
import Loading from '../components/Loading'
import { Button, Col, Row, Table } from 'react-bootstrap'
import { FaPlus } from 'react-icons/fa';
import { allProducts, deleteProduct, createProduct } from '../actions/ProductActions'
import { product_create_reset } from '../reducers/ProductCreateReducer'
import Paginate from '../components/Paginate'


const Products = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const productList = useSelector(state => state.allProducts)
    const { loading, error, products, pages, page } = productList

    const productDelete = useSelector(state => state.productDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete

    const productCreate = useSelector(state => state.productCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    let keyword = location.search

    useEffect(() => {
        dispatch(product_create_reset())

        if (!userInfo.isAdmin) {
            navigate('/login')
        }

        if (successCreate) {
            navigate(`/admin/product/${createdProduct._id}/edit`)
        } else {
            dispatch(allProducts(keyword))
        }

    }, [dispatch, navigate, userInfo, successDelete, successCreate, createdProduct, keyword])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to delete this Product?')) {
            dispatch(deleteProduct(id))
        }
    }

    const createProductHandler = () => {
        dispatch(createProduct())
    }

    return (
        <div>
            <Row className='justify-content-between'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className='w-100 d-flex justify-content-end align-items-center'>

                    <Button onClick={createProductHandler} className=''>
                        <FaPlus className='' />  Create Product
                    </Button>

                </Col>
            </Row>

            {loadingCreate && <Loading />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

            {loadingDelete && <Loading />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

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
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Category</th>
                                        <th>Brand</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {products?.map(product => (
                                        <tr key={product._id} className='text-center'>
                                            <td>  {product._id}</td>
                                            <td>  {product.name}</td>
                                            <td>  ${product.price}</td>
                                            <td>  {product.category}</td>
                                            <td>  {product.brand}</td>
                                            <td>
                                                <Link to={`/admin/product/${product._id}/edit`} >
                                                    <button className="btn bg-primary1 btn-sm me-2">
                                                        Edit
                                                    </button>
                                                </Link>
                                                <button onClick={() => deleteHandler(product._id)} className="btn btn-sm btn-danger">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                            </Table>

                            <Paginate page={page} pages={pages} isAdmin={true} />

                        </>
            }
        </div>
    );
};

export default Products;