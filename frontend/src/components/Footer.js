import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const Footer = () => {
    return (

        <footer className='bg-light w-100'>
            <Container>
                <Row>
                    <Col className='text-center py-3'>Copyright &copy; MegaShop | By Sanjoy Sarker</Col>
                </Row>
            </Container>
        </footer>

    )
}

export default Footer