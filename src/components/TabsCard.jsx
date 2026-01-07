import { useState } from 'react';

import Card from 'react-bootstrap/Card';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const TabsCard = () => {
  const [key, setKey] = useState('home');

  return (
    <Card body className="border-0 rounded-2 shadow-sm">
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="home" title="Dados Móveis">
          Dados Móveis
        </Tab>
        <Tab eventKey="profile" title="Voz">
          Voz
        </Tab>
      </Tabs>
    </Card>
  )
}

export default TabsCard;
