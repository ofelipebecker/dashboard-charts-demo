import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import PageTitle from './components/PageTitle';
import TopNav from './components/TopNav';
import TelecomMobileCard from './features/telecom-mobile/components/TelecomMobileCard';

import './App.css';

function App() {
  return (
    <>
      <Container>
        <Row>
          <Col xs={{ span: 8, offset: 2 }} xxl={{ span: 10, offset: 1 }}>
            <TopNav />
          </Col>
        </Row>
        <Row>
          <Col xs={{ span: 8, offset: 2 }} xxl={{ span: 5, offset: 1 }}>
            <PageTitle />
          </Col>
        </Row>
        <Row className='gx-5'>
          <Col xs={{ span: 8, offset: 2 }} xxl={{ span: 5, offset: 1 }}>
            <TelecomMobileCard />
          </Col>
          <Col xs={{ span: 8, offset: 2 }} xxl={{ span: 5, offset: 0 }}></Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
