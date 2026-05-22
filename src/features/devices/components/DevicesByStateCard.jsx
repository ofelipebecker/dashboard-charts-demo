import CommonCard from '../../../components/CommonCard';
import TreemapChart from '../../../components/TreemapChart';
import {
  devicesByStateChartData,
  devicesByStateChartCallbacks,
  groups,
  buttonText,
} from '../utils/devicesByStateChartConfig';

const DevicesByStateCard = () => {
  const cardTitles = {
    main: 'Devices by State | Brazil',
    secondary:
      'Demo: Device distribution of a hypothetical company across Brazilian states and regions.',
  };

  const devicesByStateChart = (
    <TreemapChart
      rawChartData={devicesByStateChartData}
      chartCallbacks={devicesByStateChartCallbacks}
      groups={groups}
      buttonText={buttonText}
    />
  );

  return <CommonCard cardTitles={cardTitles} chart={devicesByStateChart} />;
};

export default DevicesByStateCard;
