import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import PageTitle from './components/PageTitle';
import TopNav from './components/TopNav';
import TabsCard from './components/TabsCard';

import './App.css';

function App() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col xs={{ span: 10, offset: 1 }} md={{ span: 8, offset: 2 }}>
            <TopNav />
          </Col>
        </Row>
        <Row>
          <Col xs={{ span: 10, offset: 1 }} md={{ span: 8, offset: 2 }}>
            <PageTitle />
          </Col>
        </Row>
        <Row>
          <Col xs={{ span: 10, offset: 1 }} md={{ span: 8, offset: 2 }}>
            <TabsCard />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
