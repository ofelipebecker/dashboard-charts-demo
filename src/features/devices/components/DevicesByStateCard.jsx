import CommonCard from '../../../components/CommonCard';
import TreemapChart from '../../../components/TreemapChart';
import { devicesByStateChartConfig } from '../utils/devicesByStateChartConfig';

const DevicesByStateCard = () => {
  return (
    <CommonCard
      title='Devices by State'
      chart={<TreemapChart chartConfig={devicesByStateChartConfig} />}
    />
  );
};

export default DevicesByStateCard;
