import LineChart from '../../../components/LineChart.tsx';
import TabsCard from '../../../components/TabsCard.tsx';
import { costsByTypeChartConfig } from '../utils/costsByTypeChartConfig.ts';

const FinancialMobileCard = () => {
  const financialCharts = [
    {
      eventKey: 'costs',
      title: 'Costs by Type',
      renderChart: (period: string) => (
        <LineChart period={period} chartConfig={costsByTypeChartConfig} />
      ),
    },
  ];

  return (
    <TabsCard
      title={
        <>
          <b>Financial</b> | Mobile
        </>
      }
      charts={financialCharts}
    />
  );
};

export default FinancialMobileCard;
