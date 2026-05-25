import {
  type DevicesByStateData,
  type DevicesByStateChartGroupingConfig,
} from '../features/devices/utils/devicesByStateChartConfig.ts';

type TreemapChartProps = {
  rawChartData: DevicesByStateData[];
  groupingConfig: DevicesByStateChartGroupingConfig;
};

const TreemapChart = ({ rawChartData, groupingConfig }: TreemapChartProps) => {
  return <div></div>;
};

export default TreemapChart;
