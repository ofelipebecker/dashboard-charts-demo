import { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';

import { Chart as BaseChartComponent } from 'react-chartjs-2';
import { Chart as ChartJSCore, Tooltip, Legend } from 'chart.js';
import { TreemapController, TreemapElement } from 'chartjs-chart-treemap';

ChartJSCore.register(TreemapController, TreemapElement, Tooltip, Legend);

const TreemapChart = ({ rawChartData, chartCallbacks, groupingConfig }) => {
  const { formatLabel, getTooltipCallbacks, setCellBgColor } = chartCallbacks;
  const { groups, buttonText } = groupingConfig;

  const chartRef = useRef(null);
  const [activeGroup, setActiveGroup] = useState('default');

  const handleToggle = () => {
    if (!chartRef.current) return;

    const newGroup = activeGroup === 'default' ? 'alternate' : 'default';
    setActiveGroup(newGroup);
  };

  const datasetConfig = {
    datasets: [
      {
        tree: rawChartData,
        key: 'total',
        groups: groups[activeGroup],
        backgroundColor: (ctx) => setCellBgColor(ctx, activeGroup),
        borderRadius: 4,
        borderWidth: 1,
        captions: {
          align: 'center',
          color: '#fff',
          font: {
            size: 14,
            weight: 'bold',
          },
          padding: 5,
        },
        labels: {
          display: true,
          overflow: 'hidden',
          formatter: (ctx) => formatLabel(ctx),
          color: '#fff',
          font: {
            size: 12,
            weight: 'bold',
          },
        },
      },
    ],
  };

  const globalChartOptions = {
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

  const buttonLabel =
    activeGroup === 'default' ? buttonText.default : buttonText.alternate;

  return (
    <div>
      <Button
        className='my-4'
        onClick={handleToggle}
        size='lg'
        variant='warning'
      >
        {buttonLabel}
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
