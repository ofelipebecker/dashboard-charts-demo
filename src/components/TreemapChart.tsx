import { useRef, useState } from 'react';
import {
  type DevicesByStateData,
  type DevicesByStateChartCallbacks,
  type DevicesByStateChartGroupingConfig,
} from '../features/devices/utils/devicesByStateChartConfig.ts';

import Button from 'react-bootstrap/Button';

type TreemapChartProps = {
  rawChartData: DevicesByStateData[];
  chartCallbacks: DevicesByStateChartCallbacks;
  groupingConfig: DevicesByStateChartGroupingConfig;
};

const TreemapChart = ({
  rawChartData,
  chartCallbacks,
  groupingConfig,
}: TreemapChartProps) => {
  const { buttonText } = groupingConfig;

  const chartRef = useRef(null);
  const [activeGroup, setActiveGroup] = useState<'default' | 'alternate'>(
    'default'
  );

  const handleToggle = () => {
    if (!chartRef.current) return;

    setActiveGroup((prev) => (prev === 'default' ? 'alternate' : 'default'));
  };

  return (
    <div>
      <Button
        className='my-4'
        onClick={handleToggle}
        size='lg'
        variant='warning'
      >
        {buttonText[activeGroup]}
      </Button>
    </div>
  );
};

export default TreemapChart;
