import CommonCard from '../../../components/CommonCard';
import TreemapChart from '../../../components/TreemapChart';
import { devicesByStateChartConfig } from '../utils/devicesByStateChartConfig';

const DevicesByStateCard = () => {
  const subtitle =
    'Demo: Device distribution of a hypothetical company across Brazilian states and regions.';

  return (
    <CommonCard
      title='Devices by State | Brazil'
      subtitle={subtitle}
      chart={<TreemapChart chartConfig={devicesByStateChartConfig} />}
    />
  );
};

export default DevicesByStateCard;
