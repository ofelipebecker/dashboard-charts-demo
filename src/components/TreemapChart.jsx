import { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';

import { Chart as BaseChartComponent } from 'react-chartjs-2';
import { Chart as ChartJSCore, Tooltip, Legend } from 'chart.js';
import { TreemapController, TreemapElement } from 'chartjs-chart-treemap';

ChartJSCore.register(TreemapController, TreemapElement, Tooltip, Legend);

const TreemapChart = ({
  chartConfig,
  chartCallbacks,
  groups,
  buttonText,
  showToggle,
}) => {
  const { chartData } = chartConfig;
  const { formatLabel, getTooltipCallbacks, setCellBgColor } = chartCallbacks;

  const chartRef = useRef(null);
  const [activeGroup, setActiveGroup] = useState('default');

  const maxTotal = Math.max(...chartData.map((item) => item.total));

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
        backgroundColor: (ctx) => setCellBgColor(ctx, activeGroup, maxTotal),
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

  const setButtonText = () => {
    const text =
      activeGroup === 'default' ? buttonText.default : buttonText.alternate;

    return text;
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
          {setButtonText()}
        </Button>
      )}
      <div style={{ width: '100%', minHeight: '400px', position: 'relative' }}>
        <BaseChartComponent
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
