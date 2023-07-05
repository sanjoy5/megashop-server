import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    return (
        <div>
            <Nav className='justify-content-center mb-4'>
                <Nav.Item>
                    {
                        step1 ? (
                            <Nav.Link as={Link} to='/login'>Login</Nav.Link>
                        ) : (
                            <Nav.Link as={Link} to='/login' disabled>Login</Nav.Link>
                        )
                    }
                </Nav.Item>

                <Nav.Item>
                    {
                        step2 ? (
                            <Nav.Link as={Link} to='/checkout'>Checkout</Nav.Link>
                        ) : (
                            <Nav.Link as={Link} to='/checkout' disabled>Checkout</Nav.Link>
                        )
                    }
                </Nav.Item>

                <Nav.Item>
                    {
                        step3 ? (
                            <Nav.Link as={Link} to='/payment'>Payment</Nav.Link>
                        ) : (
                            <Nav.Link as={Link} to='/payment' disabled>Payment</Nav.Link>
                        )
                    }
                </Nav.Item>

                <Nav.Item>
                    {
                        step4 ? (
                            <Nav.Link as={Link} to='/placeorder'>Place Order</Nav.Link>
                        ) : (
                            <Nav.Link as={Link} to='/placeorder' disabled>Place Order</Nav.Link>
                        )
                    }
                </Nav.Item>

            </Nav>
        </div>
    );
};

export default CheckoutSteps;