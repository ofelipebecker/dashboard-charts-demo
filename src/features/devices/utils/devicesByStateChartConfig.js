import { devicesByStateData } from './devicesByStateData';

export const devicesByStateChartConfig = {
  chartData: devicesByStateData.map((state) => ({
    name: state.name,
    region: state.region,
    total: state.devices.total,
    devices: {
      desktops: state.devices.desktops,
      laptops: state.devices.laptops,
      smartphones: state.devices.smartphones,
      tablets: state.devices.tablets,
    },
  })),
  baseColor: '220, 38, 127',
};
