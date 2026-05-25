import { useRef, useState } from 'react';

import {
  type ChartData,
  type ChartOptions,
  Chart as ChartJSCore,
  Tooltip,
  Legend,
} from 'chart.js';
import { Chart as BaseChartComponent } from 'react-chartjs-2';
import {
  type TreemapScriptableContext,
  type TreemapDataPoint,
  TreemapController,
  TreemapElement,
} from 'chartjs-chart-treemap';

import Button from 'react-bootstrap/Button';

import {
  type DevicesByStateData,
  type DevicesByStateChartCallbacks,
  type DevicesByStateChartGroupingConfig,
} from '../features/devices/utils/devicesByStateChartConfig.ts';

ChartJSCore.register(TreemapController, TreemapElement, Tooltip, Legend);

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
  const { formatLabel, getTooltipCallbacks, setCellBgColor } = chartCallbacks;
  const { groups, buttonText } = groupingConfig;

  const chartRef = useRef(null);
  const [activeGroup, setActiveGroup] = useState<'default' | 'alternate'>(
    'default'
  );

  const handleToggle = () => {
    if (!chartRef.current) return;

    setActiveGroup((prev) => (prev === 'default' ? 'alternate' : 'default'));
  };

  const datasetConfig = {
    datasets: [
      {
        tree: rawChartData,
        key: 'total',
        groups: groups[activeGroup],
        backgroundColor: (ctx: TreemapScriptableContext) =>
          setCellBgColor(ctx, activeGroup),
        borderRadius: 4,
        borderWidth: 1,
        captions: {
          align: 'center' as const,
          color: '#fff',
          font: {
            size: 14,
            weight: 'bold' as const,
          },
          padding: 5,
        },
        labels: {
          display: true,
          overflow: 'hidden',
          formatter: (ctx: TreemapScriptableContext) => formatLabel(ctx),
          color: '#fff',
          font: {
            size: 12,
            weight: 'bold' as const,
          },
        },
      },
    ],
  } as unknown as ChartData<'treemap', TreemapDataPoint[], unknown>;

  const globalChartOptions: ChartOptions<'treemap'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        position: 'nearest',
        titleFont: {
          weight: 'bold',
          size: 14,
        },
        bodyFont: {
          size: 14,
        },
        padding: 10,
        callbacks: getTooltipCallbacks(activeGroup),
      },
    },
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
      <div style={{ width: '100%', minHeight: '400px', position: 'relative' }}>
        <BaseChartComponent
          ref={chartRef}
          type='treemap'
          data={datasetConfig}
          options={globalChartOptions}
        />
      </div>
    </div>
  );
};

export default TreemapChart;
