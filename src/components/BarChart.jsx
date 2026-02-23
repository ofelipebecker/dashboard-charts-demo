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
  Legend
);

const BarChart = () => {
  const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  const data = {
    labels,
    datasets: [
      {
        label: 'Monthly consumption in gigabytes',
        data: [110, 30, 80, 10, 60, 120, 40, 100, 20, 70, 90, 50],
        backgroundColor: 'rgba(255, 176, 0, 0.5)',
        borderColor: 'rgb(255, 176, 0)',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
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
        }
      },
      y: {
        title: {
          display: true,
          text: 'Gigabytes'
        },
        beginAtZero: true,
      }
    },
  };

  return (
    <div style={{ width: '100%', minHeight: '300px' }}>
      <Bar options={options} data={data} />
    </div>
  );
};

export default BarChart;
