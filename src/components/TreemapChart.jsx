import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, Legend } from 'chart.js';
import { TreemapController, TreemapElement } from 'chartjs-chart-treemap';

ChartJS.register(TreemapController, TreemapElement, Tooltip, Legend);

const TreemapChart = ({ chartConfig }) => {
  const { chartData, baseColor } = chartConfig;

  const maxValue = Math.max(...chartData.map((item) => item.value));

  const chartJsData = {
    datasets: [
      {
        tree: chartData,
        key: 'value',
        groups: ['name'],
        backgroundColor: (ctx) => {
          if (!ctx.raw || !ctx.raw._data) return `rgba(${baseColor}, 0.5)`;

          const value = ctx.raw.v || 0;
          const opacity = 0.3 + (value / maxValue) * 0.9;

          return `rgba(${baseColor}, ${opacity})`;
        },
        borderWidth: 1,
        labels: {
          display: true,
          overflow: 'hidden',
          formatter: (ctx) => {
            if (!ctx.raw || !ctx.raw._data) return [];

            const item = ctx.raw._data;
            const value = ctx.raw.v;

            return [item.name, value];
          },
          color: '#fff',
          font: {
            size: 13,
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

            return `Devices in ${item.name}: ${item.value}`;
          },
          label: () => '',
          afterBody: (ctx) => {
            const item = ctx[0].raw._data;
            console.log(item.value);
            const devices = item.children[0].devices;

            return [
              `• Desktops: ${devices.desktops};`,
              `• Laptops: ${devices.laptops};`,
              `• Smartphones: ${devices.smartphones};`,
              `• Tablets: ${devices.tablets};`,
            ];
          },
        },
      },
    },
  };

  return (
    <div style={{ width: '100%', minHeight: '400px', position: 'relative' }}>
      <Chart type='treemap' data={chartJsData} options={options} />
    </div>
  );
};

export default TreemapChart;
