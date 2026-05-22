import { devicesByStateData } from './devicesByStateData';

export const devicesByStateChartData = {
  chartData: devicesByStateData.map((state) => ({
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
  })),
};
