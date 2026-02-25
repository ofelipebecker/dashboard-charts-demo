import { useState } from 'react';
import dayjs from 'dayjs';

import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import BarChart from './BarChart';

import { mobileChartData } from '../data/mobileChartData';

const TabsCard = () => {
  const [key, setKey] = useState('home');
  const [selectedPeriod, setSelectedPeriod] = useState('3');

  const periods = [
    { value: '3', months: 3, label: 'Last 3 months' },
    { value: '6', months: 6, label: 'Last 6 months' },
    { value: '12', months: 12, label: 'Last 12 months' },
  ];

  const getFormattedDateRange = (months) => {
    const currentDate = dayjs();
    const startDate = currentDate.subtract(months - 1, 'month');
    const endDate = currentDate;

    return {
      start: startDate.format('MMM/YYYY'),
      end: endDate.format('MMM/YYYY'),
    };
  };

  const handlePeriodChange = (e) => {
    setSelectedPeriod(e.target.value);
  };

  return (
    <Card className='border-0 rounded-2 mt-5 p-2 shadow-sm'>
      <Card.Body>
        <Card.Title className='d-flex'>
          <h2>
            <b>Telecom</b> | Mobile
          </h2>
          <Form.Select
            className='w-auto ms-auto'
            value={selectedPeriod}
            onChange={handlePeriodChange}
          >
            {periods.map((period) => {
              const range = getFormattedDateRange(period.months);

              return (
                <option key={period.value} value={period.value}>
                  {period.label} ({range.start} to {range.end})
                </option>
              );
            })}
          </Form.Select>
        </Card.Title>
        <Tabs
          id='controlled-tab-example'
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className='mt-5'
        >
          <Tab eventKey='home' title='Mobile Data'>
            <BarChart period={selectedPeriod} chartConfig={mobileChartData} />
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
