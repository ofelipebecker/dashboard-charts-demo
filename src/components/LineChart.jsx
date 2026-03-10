import { memo } from 'react';

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import 'chartjs-adapter-dayjs-4';
import dayjs from 'dayjs';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const LineChart = ({ period, chartConfig }) => {
  const monthsCount = parseInt(period);

  const {
    labels: datasetLabels,
    chartData,
    rgbColors,
    yAxisTitle,
  } = chartConfig;

  const generateLabels = () => {
    const currentDate = dayjs();
    const startDate = currentDate.subtract(monthsCount - 1, 'month');

    return Array.from({ length: monthsCount }, (_, index) =>
      startDate.add(index, 'month').format('MMM/YYYY'),
    );
  };

  const timeLabels = generateLabels();

  const getDataForPeriod = () => {
    const slicedData = chartData.slice(-monthsCount);

    return datasetLabels.map((_, categoryIndex) =>
      slicedData.map((monthData) => monthData[categoryIndex]),
    );
  };

  const datasetsData = getDataForPeriod();

  const data = {
    labels: timeLabels,
    datasets: datasetLabels.map((label, index) => ({
      label,
      data: datasetsData[index],
      borderColor: `rgb(${rgbColors[index]})`,
      backgroundColor: `rgba(${rgbColors[index]}, 0.3)`,
      borderWidth: 2,
      pointBackgroundColor: `rgb(${rgbColors[index]})`,
      pointBorderColor: `rgb(${rgbColors[index]})`,
      pointBorderWidth: 1,
      pointRadius: 3,
      pointHoverRadius: 5,
      tension: 0,
      fill: false,
    })),
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
          usePointStyle: true,
          pointStyle: 'circle',
        },
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
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
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
  };

  return (
    <div style={{ width: '100%', minHeight: '300px', position: 'relative' }}>
      <Line options={options} data={data} />
    </div>
  );
};

export default memo(LineChart);
