import React from 'react'
import Rating from './Rating';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {

    const { _id, name, image, price, rating, numReviews } = product;

    return (
        <div>
            {/* <Card className='mb-4 px-2 border-0 myshadow'>
                <a href={`/product/${_id}`}>
                    <Card.Img variant="top" src={image} />
                </a>
                <Card.Body>
                    <a href={`/product/${_id}`}>
                        <Card.Title className='prodtitle text-dark' as="h4">
                            {name}
                        </Card.Title>
                    </a>
                    <Card.Text>
                        <div className="">
                            {rating} from {numReviews} reviews

                        </div>
                    </Card.Text>
                    <Card.Text as="h5">
                        ${price}
                    </Card.Text>

                </Card.Body>
            </Card> */}


            <div className="card mb-3 px-2">
                <div className="row g-0 align-items-center">
                    <div className="col-md-5">
                        <Link to={`/product/${_id}`}>
                            <img src={image} className="img-fluid rounded-start py-2" alt="..." />
                        </Link>
                    </div>
                    <div className="col-md-7">
                        <div className="card-body">
                            <Link to={`/product/${_id}`}>
                                <h5 className="card-title prodtitle text-dark">{name}</h5>
                            </Link>
                            <div className="card-text d-flex gap-1 mb-2">
                                <Rating value={rating} text={`${numReviews} reviews`} color={'#FF982E'} />
                                {/* ({rating} from {numReviews}) */}
                            </div>
                            <h5 className="card-text">${price}</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product