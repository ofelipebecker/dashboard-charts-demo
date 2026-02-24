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

const BarChart = ({ period }) => {
  const monthsCount = parseInt(period);

  const generateLabels = () => {
    const currentDate = dayjs();
    const startDate = currentDate.subtract(monthsCount - 1, 'month');

    return Array.from({ length: monthsCount }, (_, index) =>
      startDate.add(index, 'month').format('MMM/YYYY'),
    );
  };

  const labels = generateLabels();

  const getDataForPeriod = () => {
    const fullData = [110, 30, 80, 10, 60, 120, 40, 100, 20, 70, 90, 50];

    switch (monthsCount) {
      case 3:
        return fullData.slice(-3);
      case 6:
        return fullData.slice(-6);
      case 12:
      default:
        return fullData;
    }
  };

  const data = {
    labels,
    datasets: [
      {
        label: 'Monthly consumption in gigabytes',
        data: getDataForPeriod(),
        backgroundColor: 'rgba(255, 176, 0, 0.5)',
        borderColor: 'rgb(255, 176, 0)',
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
          text: 'Gigabytes',
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
