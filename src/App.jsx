import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './App.css'

function App() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col xs={{ span: 10, offset: 1 }} md={{ span: 8, offset: 2 }}></Col>
        </Row>
      </Container>
    </>
  )
}

export default App
