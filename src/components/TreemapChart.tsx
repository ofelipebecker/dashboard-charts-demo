import {
  type DevicesByStateData,
  type DevicesByStateChartCallbacks,
  type DevicesByStateChartGroupingConfig,
} from '../features/devices/utils/devicesByStateChartConfig.ts';

type TreemapChartProps = {
  rawChartData: DevicesByStateData[];
  chartCallbacks: DevicesByStateChartCallbacks;
  groupingConfig: DevicesByStateChartGroupingConfig;
};

const TreemapChart = ({
  rawChartData,
  chartCallbacks,
  groupingConfig,
}: TreemapChartProps) => {
  return <div></div>;
};

export default TreemapChart;
