import BarChart from '../../../components/BarChart';
import TabsCard from '../../../components/TabsCard';
import { mobileChartConfig } from '../utils/mobileChartConfig';
import { voiceChartConfig } from '../utils/voiceChartConfig';

const TelecomMobileCard = () => {
  const telecomCharts = [
    {
      eventKey: 'mobile',
      title: 'Mobile Data',
      renderChart: (period) => (
        <BarChart period={period} chartConfig={mobileChartConfig} />
      ),
    },
    {
      eventKey: 'voice',
      title: 'Voice',
      renderChart: (period) => (
        <BarChart period={period} chartConfig={voiceChartConfig} />
      ),
    },
  ];

  return (
    <TabsCard
      title={
        <>
          <b>Telecom</b> | Mobile
        </>
      }
      charts={telecomCharts}
    />
  );
};

export default TelecomMobileCard;
