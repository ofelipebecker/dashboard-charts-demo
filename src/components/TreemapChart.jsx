import { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';

import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, Legend } from 'chart.js';
import { TreemapController, TreemapElement } from 'chartjs-chart-treemap';

ChartJS.register(TreemapController, TreemapElement, Tooltip, Legend);

const TreemapChart = ({ chartConfig }) => {
  const { chartData, baseColor } = chartConfig;
  const chartRef = useRef(null);
  const [showRegions, setShowRegions] = useState(false);

  const regionColors = {
    North: '100, 143, 255',
    Northeast: '120, 94, 240',
    Southeast: '220, 38, 127',
    South: '254, 97, 0',
    'Central-West': '255, 176, 0',
  };

  const maxTotal = Math.max(...chartData.map((state) => state.total));

  const handleToggleRegions = () => {
    if (!chartRef.current) return;

    const chart = chartRef.current;
    const newShowRegions = !showRegions;

    chart.data.datasets[0].groups = newShowRegions
      ? ['region', 'name']
      : ['name'];

    chart.update();

    setShowRegions(newShowRegions);
  };

  const chartJsData = {
    datasets: [
      {
        tree: chartData,
        key: 'total',
        groups: showRegions ? ['region', 'abbreviation'] : ['abbreviation'],
        backgroundColor: (ctx) => {
          if (!ctx.raw || !ctx.raw._data) return `rgba(${baseColor}, 0.5)`;

          const item = ctx.raw._data;

          if (showRegions) {
            if (item.region && !item.name) {
              return `rgba(${regionColors[item.region]}, 0.7)`;
            } else {
              const opacity = 0.3 + (item.total / maxTotal) * 0.4;

              return `rgba(${regionColors[item.region]}, ${opacity})`;
            }
          } else {
            const opacity = 0.3 + (item.total / maxTotal) * 0.9;

            return `rgba(${baseColor}, ${opacity})`;
          }
        },
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
          formatter: (ctx) => {
            const item = ctx.raw._data;

            if (item.region && !item.abbreviation) {
              return [item.region, item.total];
            }

            return [item.abbreviation, item.total];
          },
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
        callbacks: {
          title: (ctx) => {
            const item = ctx[0].raw._data;

            if (item.region) {
              return `Region: ${item.region} (Total: ${item.total} devices)`;
            }

            return `${item.children[0].name}: ${item.total} devices`;
          },
          label: () => '',
          afterBody: (ctx) => {
            const item = ctx[0].raw._data;

            if (showRegions) {
              const children = item.children;

              const totals = children.reduce(
                (acc, state) => {
                  return {
                    desktops: acc.desktops + state.devices.desktops,
                    laptops: acc.laptops + state.devices.laptops,
                    smartphones: acc.smartphones + state.devices.smartphones,
                    tablets: acc.tablets + state.devices.tablets,
                  };
                },
                { desktops: 0, laptops: 0, smartphones: 0, tablets: 0 },
              );

              return [
                `• Desktops: ${totals.desktops};`,
                `• Laptops: ${totals.laptops};`,
                `• Smartphones: ${totals.smartphones};`,
                `• Tablets: ${totals.tablets};`,
              ];
            } else {
              const state = item.children[0];
              return [
                `• Desktops: ${state.devices.desktops};`,
                `• Laptops: ${state.devices.laptops};`,
                `• Smartphones: ${state.devices.smartphones};`,
                `• Tablets: ${state.devices.tablets};`,
              ];
            }
          },
        },
      },
    },
  };

  return (
    <div>
      <Button
        className='my-4'
        onClick={handleToggleRegions}
        size='lg'
        variant='warning'
      >
        {showRegions ? 'Hide Regions' : 'Show Regions'}
      </Button>
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
