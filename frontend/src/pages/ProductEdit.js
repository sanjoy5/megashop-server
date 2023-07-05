import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Message from '../components/Message'
import Loading from '../components/Loading'
import { Button } from 'react-bootstrap'
import { singleProduct, updateProduct } from '../actions/ProductActions'
import { update_product_reset } from '../reducers/UpdateProuductReducer'
import axios from 'axios'


const ProductEdit = () => {

    const { id } = useParams()


    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const productDetails = useSelector(state => state.productDetails)
    const { loading, product, error } = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const { loading: loadingUpdate, success: successUpdate, error: errorUpdate } = productUpdate


    useEffect(() => {
        if (successUpdate) {
            dispatch(update_product_reset())
            navigate('/admin/products')
        } else {
            if (!product?.name || product?._id !== Number(id)) {
                dispatch(singleProduct(id))
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }
        }

    }, [dispatch, product, id, navigate, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id: id,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description
        }))
    }


    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('image', file)
        formData.append('id', id)
        setUploading(true)
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post(`/api/products/upload/`, formData, config)
            setImage(data)
            setUploading(false)

        } catch (error) {
            setUploading(false)
        }
    }

    return (

        <>


            <div className='container my-5'>

                <Link to='/admin/products'>
                    <Button className='btn btn-primary1'>Go Back</Button>
                </Link>

                <div className="row align-items-center py-md-4 justify-content-center">

                    <div className="col-md-6 mb-5 mb-md-0">
                        <h2 className='mb-3'>Edit Product</h2>

                        {loadingUpdate && <Loading />}
                        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

                        {loading ? <Loading /> : error ? <Message variant='danger'>{error}</Message> : (
                            <form onSubmit={submitHandler}>
                                <div class="mb-3">
                                    <label for="name" class="form-label">Name</label>
                                    <input type="text" class="form-control border" id="name" placeholder="Enter Full Name" onChange={(e) => setName(e.target.value)} value={name} />
                                </div>


                                <div class="mb-3">
                                    <label for="price" class="form-label">Price</label>
                                    <input type="number" class="form-control border" id="price" placeholder="Enter Price" onChange={(e) => setPrice(e.target.value)} value={price} />
                                </div>

                                <div class="mb-3">
                                    <label for="image" class="form-label">Image</label>
                                    {/* <input type="file" class="form-control border" id="image" placeholder="Enter Image" onChange={uploadFileHandler} /> */}
                                    <input onChange={uploadFileHandler} className='form-control border' type="file" id="image" />
                                </div>
                                {
                                    uploading && <Loading />
                                }

                                <div class="mb-3">
                                    <label for="brand" class="form-label">Brand</label>
                                    <input type="text" class="form-control border" id="brand" placeholder="Enter Brand" onChange={(e) => setBrand(e.target.value)} value={brand} />
                                </div>

                                <div class="mb-3">
                                    <label for="category" class="form-label">Category</label>
                                    <input type="text" class="form-control border" id="category" placeholder="Enter Category" onChange={(e) => setCategory(e.target.value)} value={category} />
                                </div>

                                <div class="mb-3">
                                    <label for="countInStock" class="form-label">Stock</label>
                                    <input type="number" class="form-control border" id="countInStock" placeholder="Enter Stock" onChange={(e) => setCountInStock(e.target.value)} value={countInStock} />
                                </div>

                                <div class="mb-3">
                                    <label for="description" class="form-label">Description</label>
                                    <input type="text" class="form-control border" id="description" placeholder="Enter Description" onChange={(e) => setDescription(e.target.value)} value={description} />
                                </div>


                                <button type='submit' className='btn bg-primary1 btn-lg'>
                                    Update Products
                                </button>
                            </form>
                        )}

                    </div>

                </div>

            </div>
        </>

    );
};

export default ProductEdit;