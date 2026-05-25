import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import DevicesByStateCard from './features/devices/components/DevicesByStateCard.tsx';
import PageTitle from './components/PageTitle.tsx';
import TopNav from './components/TopNav.tsx';
import FinancialMobileCard from './features/financial-mobile/components/FinancialMobileCard.tsx';
import TelecomMobileCard from './features/telecom-mobile/components/TelecomMobileCard.tsx';

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
          <Col xs={{ span: 8, offset: 2 }} xxl={{ span: 5, offset: 0 }}>
            <FinancialMobileCard />
          </Col>
        </Row>
        <Row>
          <Col
            xs={{ span: 8, offset: 2 }}
            xxl={{ span: 10, offset: 1 }}
            className='mb-10'
          >
            <DevicesByStateCard />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
