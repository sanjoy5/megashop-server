import React, { useState } from 'react'
import { Button, Container, Form, Nav, NavDropdown, Navbar } from 'react-bootstrap'
import { FiShoppingCart, FiUser, FiUserCheck } from 'react-icons/fi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/UserAction';


const Header = () => {
    const [keyword, setKeyword] = useState('')
    const navigate = useNavigate()
    const location = useLocation()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const dispatch = useDispatch()

    const handleLogout = () => {
        console.log('Clicked');
        dispatch(logout())
    }

    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword) {
            navigate(`/?keyword=${keyword}&page=1`)
        } else {
            navigate(location.pathname)
        }
    }

    return (
        <header>
            <Navbar className='border-0 bg-primary1' variant='dark' expand="lg">
                <Container>
                    <Link to="/" className='fs-4 fw-bold text-white me-md-5'>MegaShop</Link>
                    {
                        userInfo && userInfo.isAdmin && (
                            <NavDropdown title={<span className='text-white '><FiUserCheck className='fs-5' /> Admin </span>} id='adminmenu'>

                                <NavDropdown.Item as={Link} to='/admin/users'>
                                    Users
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} to='/admin/products'>
                                    Products
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} to='/admin/orders'>
                                    Orders
                                </NavDropdown.Item>

                            </NavDropdown>
                        )
                    }

                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Form onSubmit={submitHandler} className="d-none d-md-flex mx-auto w-50">
                            <Form.Control
                                type="text"
                                placeholder="Search"
                                name='q'
                                onChange={(e) => setKeyword(e.target.value)}
                                className="me-2"
                                style={{ height: "42px" }}
                            />
                            <Button type='submit' className='bg-secondary1'>Search</Button>
                        </Form>
                        <Form onSubmit={submitHandler} className="d-flex mx-auto w-100 mt-2 d-md-none">
                            <Form.Control
                                type="text"
                                placeholder="Search"
                                name='q'
                                onChange={(e) => setKeyword(e.target.value)}
                                className="me-2"

                            />
                            <Button type='submit' className='bg-secondary1'>Search</Button>
                        </Form>

                        <Nav
                            className="my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >

                            <Link className='d-flex align-items-center  text-white me-2' to="/cart"><FiShoppingCart className='fs-5 me-1' /> Cart</Link>
                            {
                                userInfo ? (
                                    <NavDropdown title={<span className='text-white '><FiUser className='fs-5' /> {userInfo.name} </span>} id='username'>

                                        <NavDropdown.Item as={Link} to='/profile'>
                                            Profile
                                        </NavDropdown.Item>

                                        <NavDropdown.Item onClick={handleLogout}>
                                            Logout
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                ) : (
                                    <Link className='d-flex align-items-center gap-1 text-white ms-md-3' to="/login"><FiUser className='fs-5' /> Login</Link>

                                )
                            }




                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header