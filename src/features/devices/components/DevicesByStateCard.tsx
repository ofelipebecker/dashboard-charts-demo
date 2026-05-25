import CommonCard from '../../../components/CommonCard.tsx';
import TreemapChart from '../../../components/TreemapChart.tsx';
import {
  devicesByStateChartData,
  devicesByStateChartCallbacks,
  devicesByStateChartGroupingConfig,
} from '../utils/devicesByStateChartConfig.ts';

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
      groupingConfig={devicesByStateChartGroupingConfig}
    />
  );

  return <CommonCard cardTitles={cardTitles} chart={devicesByStateChart} />;
};

export default DevicesByStateCard;
