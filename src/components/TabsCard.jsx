import { useState } from 'react';

import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import BarChart from './BarChart';

const TabsCard = () => {
  const [key, setKey] = useState('home');

  return (
    <Card className='border-0 rounded-2 mt-5 p-2 shadow-sm'>
      <Card.Body>
        <Card.Title className='d-flex'>
          <h2>
            <b>Telecom</b> | Mobile
          </h2>
          <Form.Select className='w-auto ms-auto'>
            <option value='1'>Last X months (MMM/202X → MMM/202X)</option>
            <option value='2'>Last X months (MMM/202X → MMM/202X)</option>
            <option value='3'>Last X months (MMM/202X → MMM/202X)</option>
          </Form.Select>
        </Card.Title>
        <Tabs
          id='controlled-tab-example'
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className='mt-5'
        >
          <Tab eventKey='home' title='Mobile Data'>
            <BarChart />
          </Tab>
          <Tab eventKey='profile' title='Voice'>
            Voice
          </Tab>
        </Tabs>
      </Card.Body>
    </Card>
  );
};

export default TabsCard;
