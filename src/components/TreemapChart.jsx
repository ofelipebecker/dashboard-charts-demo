import { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';

import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, Legend } from 'chart.js';
import { TreemapController, TreemapElement } from 'chartjs-chart-treemap';

ChartJS.register(TreemapController, TreemapElement, Tooltip, Legend);

const TreemapChart = ({
  chartConfig,
  groups,
  getBackgroundColor,
  getLabelFormatter,
  getTooltipCallbacks,
  buttonText,
  showToggle,
}) => {
  const { chartData } = chartConfig;
  const chartRef = useRef(null);
  const [activeGroup, setActiveGroup] = useState('default');

  const maxTotal = Math.max(
    ...chartData.map((item) => item.total || item.value),
  );

  const handleToggle = () => {
    if (!chartRef.current) return;

    const chart = chartRef.current;
    const newGroup = activeGroup === 'default' ? 'alternate' : 'default';

    chart.data.datasets[0].groups = groups[newGroup];
    chart.update();
    setActiveGroup(newGroup);
  };

  const chartJsData = {
    datasets: [
      {
        tree: chartData,
        key: 'total',
        groups: groups[activeGroup],
        backgroundColor: (ctx) =>
          getBackgroundColor(ctx, activeGroup, maxTotal),
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
          formatter: (ctx) => getLabelFormatter(ctx, activeGroup),
          color: '#fff',
          font: {
            size: 12,
            weight: 'bold',
          },
        },
      },
    ],
  };

  const options = {
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

  const getButtonText = () => {
    if (typeof buttonText === 'string') return buttonText;
    return activeGroup === 'default'
      ? buttonText.default
      : buttonText.alternate;
  };

  return (
    <div>
      {showToggle && (
        <Button
          className='my-4'
          onClick={handleToggle}
          size='lg'
          variant='warning'
        >
          {getButtonText()}
        </Button>
      )}
      <div style={{ width: '100%', minHeight: '400px', position: 'relative' }}>
        <Chart
          ref={chartRef}
          type='treemap'
          data={chartJsData}
          options={options}
        />
      </div>
    </div>
  );
};

export default TreemapChart;
