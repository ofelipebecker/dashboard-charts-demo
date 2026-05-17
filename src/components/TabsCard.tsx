import { type ReactNode, type ChangeEvent, useState } from 'react';
import dayjs from 'dayjs';

import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import LazyTab from './LazyTab.tsx';

type Charts = {
  eventKey: string;
  title: string;
  renderChart: (period: string) => ReactNode;
};

type TabsCardProps = {
  title: ReactNode;
  charts: Charts[];
};

const TabsCard = ({ title, charts }: TabsCardProps) => {
  const defaultPeriod = '3';
  const defaultTab = charts[0]?.eventKey || 'tab0';

  const [activeTab, setActiveTab] = useState<string | null>(defaultTab);
  const [selectedPeriod, setSelectedPeriod] = useState(defaultPeriod);

  const periods = [
    { value: '3', months: 3, label: 'Last 3 months' },
    { value: '6', months: 6, label: 'Last 6 months' },
    { value: '12', months: 12, label: 'Last 12 months' },
  ];

  const getFormattedDateRange = (months: number) => {
    const currentDate = dayjs();
    const startDate = currentDate.subtract(months - 1, 'month');
    const endDate = currentDate;

    return {
      start: startDate.format('MMM/YYYY'),
      end: endDate.format('MMM/YYYY'),
    };
  };

  const handlePeriodChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newPeriod = event.target.value;

    setSelectedPeriod(newPeriod);
  };

  return (
    <Card className='border-0 rounded-2 mt-5 p-2 shadow-sm'>
      <Card.Body>
        <Card.Title className='d-flex'>
          <h2>{title}</h2>
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
          activeKey={activeTab ?? undefined}
          onSelect={(selectedTab) => setActiveTab(selectedTab)}
          className='mt-5'
        >
          {charts.map((chart) => (
            <Tab
              key={chart.eventKey}
              eventKey={chart.eventKey}
              title={chart.title}
            >
              <LazyTab active={activeTab === chart.eventKey}>
                {chart.renderChart(selectedPeriod)}
              </LazyTab>
            </Tab>
          ))}
        </Tabs>
      </Card.Body>
    </Card>
  );
};

export default TabsCard;
