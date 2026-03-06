import { devicesByStateData } from './devicesByStateData';

export const devicesByStateChartConfig = {
  chartData: devicesByStateData.map((item) => ({
    name: item.state,
    value: item.devices.total,
  })),
  baseColor: '220, 38, 127',
};
