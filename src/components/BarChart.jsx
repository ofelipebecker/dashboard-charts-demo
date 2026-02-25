import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import 'chartjs-adapter-dayjs-4';
import dayjs from 'dayjs';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const BarChart = ({ period, chartConfig }) => {
  const monthsCount = parseInt(period);

  const { label, chartData, backgroundColor, borderColor, yAxisTitle } =
    chartConfig;

  const generateLabels = () => {
    const currentDate = dayjs();
    const startDate = currentDate.subtract(monthsCount - 1, 'month');

    return Array.from({ length: monthsCount }, (_, index) =>
      startDate.add(index, 'month').format('MMM/YYYY'),
    );
  };

  const labels = generateLabels();

  const getDataForPeriod = () => {
    switch (monthsCount) {
      case 3:
        return chartData.slice(-3);
      case 6:
        return chartData.slice(-6);
      case 12:
      default:
        return chartData;
    }
  };

  const data = {
    labels,
    datasets: [
      {
        label,
        data: getDataForPeriod(),
        backgroundColor,
        borderColor,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        align: 'start',
        labels: {
          boxHeight: 15,
          boxWidth: 15,
        },
        position: 'top',
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        title: {
          display: true,
          text: yAxisTitle,
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: '100%', minHeight: '300px', position: 'relative' }}>
      <Bar options={options} data={data} />
    </div>
  );
};

export default BarChart;
