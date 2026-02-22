import { useState } from 'react';

import Card from 'react-bootstrap/Card';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import BarChart from './BarChart';

const TabsCard = () => {
  const [key, setKey] = useState('home');

  return (
    <Card className="border-0 rounded-2 mt-5 p-2 shadow-sm">
      <Card.Body>
        <Card.Title as="h2">
          <b>Telecom</b> | Móvel
        </Card.Title>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mt-5"
        >
          <Tab eventKey="home" title="Dados Móveis">
            <BarChart/>
          </Tab>
          <Tab eventKey="profile" title="Voz">
            Voz
          </Tab>
        </Tabs>
      </Card.Body>
    </Card>
  )
}

export default TabsCard;
