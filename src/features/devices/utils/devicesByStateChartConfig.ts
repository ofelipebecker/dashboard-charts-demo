import { devicesByStateData } from './devicesByStateData.ts';

export const devicesByStateChartData = devicesByStateData.map((state) => ({
  name: state.name,
  abbreviation: state.abbreviation,
  region: state.region,
  total: state.devices.total,
  devices: {
    desktops: state.devices.desktops,
    laptops: state.devices.laptops,
    smartphones: state.devices.smartphones,
    tablets: state.devices.tablets,
  },
}));

const colors = {
  main: '170, 68, 153', // #AA4499
  regions: {
    North: '100, 143, 255', // #648FFF
    Northeast: '120, 94, 240', // #785EF0
    Southeast: '220, 38, 127', // #DC267F
    South: '254, 97, 0', // #FE6100
    'Central-West': '255, 176, 0', // #FFB000
  },
};

const maxTotal = Math.max(
  ...devicesByStateChartData.map((state) => state.total)
);
