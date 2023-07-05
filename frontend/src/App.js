import Footer from './components/Footer';
import Header from './components/Header'
import { Container } from 'react-bootstrap';
import Home from '../src/pages/Home'

function App() {
  return (
    <div className="">
      <Header />
      <main className='py-4'>
        <Container>
          <Home />
        </Container>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default App;


