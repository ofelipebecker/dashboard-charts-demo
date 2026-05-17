import BarChart from '../../../components/BarChart.tsx';
import TabsCard from '../../../components/TabsCard.tsx';
import { mobileChartConfig } from '../utils/mobileChartConfig.ts';
import { voiceChartConfig } from '../utils/voiceChartConfig.ts';

const TelecomMobileCard = () => {
  const telecomCharts = [
    {
      eventKey: 'mobile',
      title: 'Mobile Data',
      renderChart: (period: string) => (
        <BarChart period={period} chartConfig={mobileChartConfig} />
      ),
    },
    {
      eventKey: 'voice',
      title: 'Voice',
      renderChart: (period: string) => (
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
