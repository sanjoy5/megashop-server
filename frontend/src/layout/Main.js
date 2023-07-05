import React from 'react'
import Header from '../components/Header'
import { Outlet, useNavigation } from 'react-router-dom'
import Footer from '../components/Footer'
import { Container } from 'react-bootstrap'
import Loading from '../components/Loading'

const Main = () => {
    const navigation = useNavigation()
    return (
        <div>
            <Header></Header>
            <div>{navigation.state === 'loading' && <Loading />}</div>
            <main className='py-4'>
                <Container>
                    <Outlet></Outlet>
                </Container>
            </main>
            <Footer></Footer>
        </div>
    )
}

export default Main